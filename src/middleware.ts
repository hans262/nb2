import { extname, posix } from "node:path";
import { Stats, stat } from "node:fs";
import {
  out404,
  outDir,
  outFile,
  outCache,
  outRange,
  outZip,
} from "./response.js";
import { Context, Methods, Middleware } from "./common/context.js";
import { Logger } from "./common/logger.js";
import { metadatas } from "./common/controller.js";

/**
 * 头盔中间件
 * @param ctx
 * @param next
 */
export const helmet: Middleware = (ctx, next) => {
  const { res } = ctx;
  //服务器相关信息
  res.setHeader("Server", "Nicest Server 1.0");

  /**
   * 用于缓存控制，决定下一个请求头，
   * 用一个缓存的response还是向服务器请求一个新的response。
   */
  res.setHeader("Vary", "Accept, Accept-Encoding, User-Agent");

  //是否支持范围请求
  res.setHeader("Accept-Ranges", "bytes");

  //服务器时间
  res.setHeader("Date", new Date().toUTCString());

  /**
   * 发起一个请求会创建一个tcp连接，会有握手环节
   * 决定浏览器是否会在下一个请求的时候，继续使用这个连接
   * timeout 空闲连接需要保持打开状态的最小时长
   * max 此连接可以发送的请求数的最大值
   * http/2 将忽略该值
   */
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Keep-Alive", "timeout=5, max=1000");

  //服务器支持的请求类型
  res.setHeader("Allow", Methods.join(", "));

  //跨域 cors
  if (ctx.opt.cors) {
    res.setHeader(
      "Access-Control-Allow-Methods",
      Methods.join(", ") + ", OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  // 用来检测是否支持跨域的请求，不返回任何内容即可
  if (ctx.req.method === "OPTIONS") return ctx.res.end();

  next();
};

/**
 * 控制器中间件
 * @param ctx
 * @param next
 */
export const handleController: Middleware = async (ctx, next) => {
  const { req, pathname, startTime } = ctx;
  // console.log(metadatas);

  let path = "";
  const md = metadatas.find((c) => {
    if (!c.instance) return false;
    if (c.method !== req.method) return false;
    if (!c.cpath) return false;

    //如果没有'/'前缀，加上前缀'/'
    path = posix.join("/", ctx.opt.apiPrefix ?? "/", c.cpath, c.mpath!);
    return ctx.matchRoutes(path);
  });

  if (!md) return next();

  if (path) {
    // 解析url参数 (?<id>[^/]+)
    const params = path.match(/:([^/]+)/g);
    if (params?.length) {
      let regStr = path;
      params.forEach((v) => {
        regStr = regStr.replace(v, `(?<${v.slice(1)}>[^/]+)`);
      });
      const matched = pathname.match(new RegExp(regStr));
      // 存储url参数
      ctx.params = { ...matched?.groups };
    }
  }

  if (md.tf) {
    return md.tf?.(ctx, () => {
      md.instance[md.propertyKey](ctx);
    });
  }
  await md.instance[md.propertyKey](ctx);

  Logger.self.stdlog({
    level: "controller",
    color: "green",
    logPath: ctx.opt.logDir,
    msg: pathname + " +" + (Date.now() - startTime) + "ms",
  });
};

/**
 * 静态资源中间件
 * @param ctx
 * @param next
 */
export const handleStatic: Middleware = (ctx, next) => {
  //静态资源绝对路径
  const staticPath = posix.join(ctx.opt.static?.root!, ctx.pathname);
  staticTask(ctx, staticPath);
};

/**
 * 响应静态资源
 * @param ctx
 * @param staticPath 静态资源路径
 */
export function staticTask(ctx: Context, staticPath: string) {
  stat(staticPath, (err, stats) => {
    if (err) {
      return out404(ctx, { staticPath });
    }

    if (stats.isDirectory()) {
      return outDir(ctx, staticPath);
    }

    if (stats.isFile()) {
      const { res, req, opt } = ctx;
      /**
       * 实际应用中的缓存策略
       * 更改频繁的文件，采取协商缓存，Cache-Control: no-cache
       * 基本不变化的资源，采取强制缓存 Cache-Control: max-age=xxx
       * Cache-Control 强制缓存
       * ETag 协商缓存
       */
      res.setHeader("Cache-Control", `max-age=${opt.static!.cacheMaxAge!}`);
      res.setHeader("ETag", generateETag(stats));

      //判断缓存
      if (isHitEtagCache(ctx, stats)) return outCache(ctx, staticPath);

      //文件类型
      res.setHeader("Content-Type", ctx.getContentTypeOfPath(staticPath));

      //内容大小
      res.setHeader("Content-Length", stats.size);

      //支持范围请求，请求一个文件的一部分
      const range = req.headers["range"];
      if (range) {
        return outRange(ctx, {
          size: stats.size,
          staticPath,
          range,
        });
      }

      const encoding = isHitZipType(ctx, staticPath);
      //需要压缩
      if (encoding) {
        return outZip(ctx, staticPath, encoding);
      }

      return outFile(ctx, staticPath);
    }
  });
}

/**
 * 生成 ETags
 * @param stats
 */
export function generateETag(stats: Stats) {
  //文件最后修改时间的毫秒值，16进制
  const mtime: string = stats.mtimeMs.toString(16);
  const size: string = stats.size.toString(16);
  return `W/"${mtime}-${size}"`;
}

/**
 * 校验当前资源是否命中etag缓存
 * @param ctx
 * @param stats 当前资源
 */
export function isHitEtagCache(ctx: Context, stats: Stats) {
  const ifNoneMatch = ctx.req.headers["if-none-match"]; //客户端ETag
  return ifNoneMatch === generateETag(stats);
}

/**
 * 是否命中压缩类型
 * @param ctx
 * @param staticPath
 */
export function isHitZipType(ctx: Context, staticPath: string) {
  const extName = extname(staticPath);
  //满足服务器设定的压缩文件范围
  if (!ctx.opt.static!.canZipFile!.includes(extName.slice(1))) {
    return false;
  }

  //客户端支持的压缩类型
  const encoding = ctx.req.headers["accept-encoding"]?.toString();
  if (!encoding) return false;

  return encoding;
}
