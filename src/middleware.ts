import posix from "node:path/posix";
import { Stats, stat } from "node:fs";
import {
  outDir,
  outFile,
  outCache,
  outRange,
  outZip,
  out500,
} from "./response.js";
import { Middleware } from "./common/model.js";
import { metadatas } from "./common/decorator.js";
import { Context } from "./common/context.js";
import {
  generateETag,
  isHitEtagCache,
  isHitZipType,
} from "./common/compare.js";
import { Logger } from "./common/utils.js";
import { ServerOpt } from "./dopx.js";

/**
 * 跨域中间件
 * @param ctx
 * @param next
 */
export const corsHandle: Middleware = (ctx, next) => {
  const { res, req } = ctx;
  const corsOpt = ctx.opt.cors;
  // preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", corsOpt!.origin);
    if (corsOpt!.credentials) {
      // 是否允许，origin不能设置为*
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    // 允许客户端携带的请求头，动态设置
    const requestHeaders = req.headers["access-control-request-headers"];
    if (requestHeaders) {
      res.setHeader("Access-Control-Allow-Headers", requestHeaders);
    }
    res.setHeader("Vary", "Access-Control-Request-Headers");

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.setHeader("Access-Control-Max-Age", corsOpt!.maxAge.toString());

    res.statusCode = 204;
    res.setHeader("Content-Length", "0");
    res.end();
  } else {
    res.setHeader("Access-Control-Allow-Origin", corsOpt!.origin);
    if (corsOpt!.credentials) {
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    next();
  }
};

/**
 * 控制器中间件
 * @param ctx
 * @param next
 */
export const controllerHandle: Middleware = async (ctx, next) => {
  const { req, pathname } = ctx;
  // console.log(metadatas);

  let params: { [key: string]: string } = {};
  const md = metadatas.find((c) => {
    if (!c.cpath || !c.instance || c.method !== req.method) return false;

    //如果没有'/'前缀，加上前缀'/'
    const path = posix.join("/", c.apifix ?? "/", c.cpath, c.mpath!);
    const match = ctx.matchRoutes(path);
    params = match.params;
    return match.matched;
  });

  if (!md) return next();

  // 存储url参数
  ctx.params = params;

  try {
    if (md.tf) {
      await md.tf(ctx, async () => {
        try {
          await md.instance[md.functionName](ctx);
        } catch (err: any) {
          out500(ctx, err);
          return;
        }
      });
    } else {
      await md.instance[md.functionName](ctx);
    }
  } catch (err: any) {
    out500(ctx, err);
    return;
  }

  Logger.self.log({
    level: "controller",
    path: pathname,
  });
};

/**
 * 静态资源中间件
 * @param ctx
 * @param next
 */
export const staticHandle: Middleware = (ctx, next) => {
  //静态资源绝对路径
  const staticPath = posix.join(ctx.opt.static?.root!, ctx.pathname);

  stat(staticPath, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") {
        // 强制缓存10s，避免浏览器频繁获取
        if (ctx.pathname === "/favicon.ico") {
          ctx.res.setHeader("Vary", "User-Agent");
          ctx.res.setHeader("Cache-Control", "public, max-age=10");
          ctx.status(404);
          ctx.res.end();
          return;
        }
        //文件或目录不存在，到下一个中间件
        next();
      } else {
        Logger.self.log({ level: "error", path: staticPath, msg: err.message });
        ctx.status(403).html(`
          <h2>权限错误</h2>
          <p>无法访问该路径：${staticPath}</p>
          <p>错误信息：${err.message}</p>
        `);
      }
      return;
    }
    //是否支持范围请求
    ctx.res.setHeader("Accept-Ranges", "bytes");

    if (stats.isDirectory()) {
      return outDir(ctx, staticPath);
    }

    if (stats.isFile()) {
      taskFile(ctx, stats, staticPath);
    }
  });
};

export function taskFile(ctx: Context, stats: Stats, staticPath: string) {
  const { res, req, opt } = ctx;

  /**
   * Vary
   * 配合缓存使用
   * 哪些请求头会影响输出内容就设置
   */
  res.setHeader("Vary", "Accept-Encoding, If-None-Match");

  /**
   * 强制缓存
   * 基本不变化的资源采用该模式
   * max-age 缓存时间，单位s
   * public 可以被任何缓存，包括cdn
   * private 只能被用户缓存，如浏览器
   * no-cache 不缓存
   */
  res.setHeader("Cache-Control", `public max-age=${opt.static!.cacheMaxAge!}`);

  /**
   * 协商缓存 ETag
   * 需要频繁修改的文件采用该模式
   * 需要校验是否命中缓存
   */
  res.setHeader("ETag", generateETag(stats));
  if (isHitEtagCache(ctx, stats)) return outCache(ctx, staticPath);

  //资源类型
  res.setHeader("Content-Type", ctx.getContentTypeOfPath(staticPath));

  //资源大小
  res.setHeader("Content-Length", stats.size);

  //命中范围请求
  const range = req.headers["range"];
  if (range) {
    return outRange(ctx, {
      size: stats.size,
      staticPath,
      range,
    });
  }

  const encoding = isHitZipType(ctx, staticPath);
  //命中压缩
  if (encoding) {
    return outZip(ctx, staticPath, encoding);
  }

  outFile(ctx, staticPath);
}
