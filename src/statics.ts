import { Dirent, Stats, createReadStream, readdirSync, stat } from "node:fs";
import posix from "node:path/posix";
import { Deflate, Gzip, createDeflate, createGzip } from "node:zlib";
import { Context } from "./context.js";
import { Logger } from "./utils.js";
import { Middleware } from "./middleware.js";

interface StaticConfig {
  /**静态资源本地根路径*/
  root: string;
  /**默认允许压缩的文件*/
  canZipFile?: string[];
  /**资源缓存时间 单位：秒*/
  cacheMaxAge?: number;
  /**是否默认响应index.html文件 */
  index?: boolean;
  /**
   * 单页SPA应用
   * 是否将全局的404重定向到index.html
   */
  spa?: boolean;
}

export var dsopt: Required<StaticConfig> = {
  root: "/",
  canZipFile: ["css", "html", "js", "woff"],
  cacheMaxAge: 86400, //一天
  index: true,
  spa: false,
};

export function statics(opt?: StaticConfig | string): Middleware {
  opt = typeof opt === "string" ? { root: opt } : opt;
  dsopt = Object.assign({}, dsopt, opt);

  return (ctx, next) => {
    //静态资源绝对路径
    const staticPath = posix.join(dsopt.root, ctx.pathname);

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
          ctx.app.log.error(err, staticPath);
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
}

export function taskFile(ctx: Context, stats: Stats, staticPath: string) {
  const { res, req } = ctx;

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
  res.setHeader("Cache-Control", `public max-age=${dsopt.cacheMaxAge}`);

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

/**
 * 响应文件
 * @param ctx
 * @param staticPath
 */
export function outFile(ctx: Context, staticPath: string) {
  const { res } = ctx;
  const stream = createReadStream(staticPath);
  stream.on("error", (err) => {
    stream.unpipe(res);
    //这里无法正确响应，问题待排查
    ctx.status(403).html(`
      <h2>权限错误</h2>
      <p>无法访问该路径：${staticPath}</p>
      <p>错误信息：${err.message}</p>
    `);
    ctx.app.log.error(err, staticPath);
  });
  ctx.status(200);
  stream.pipe(res);

  ctx.app.log.info(`static file -> ${staticPath}`);
}

/**
 * 响应目录
 * @param ctx
 * @param staticPath
 */
export function outDir(ctx: Context, staticPath: string) {
  let dirents: Array<Dirent>;
  try {
    dirents = readdirSync(staticPath, {
      withFileTypes: true,
    });
  } catch (err: any) {
    //证明该文件夹无法打开，可能存在权限等问题。
    ctx.status(403).html(`
      <h2>权限错误</h2>
      <p>无法访问该路径：${ctx.pathname}</p>
      <p>错误信息：${err.message}</p>
    `);
    ctx.app.log.error(err, staticPath);
    return;
  }

  // 检查index.html文件是否存在
  if (dsopt.index && dirents.find((d) => d.name === "index.html")) {
    const indexPath = posix.join(staticPath, "index.html");
    stat(indexPath, (err, stats) => {
      if (err) {
        ctx.status(403).html(`
          <h2>权限错误</h2>
          <p>无法访问该路径：${indexPath}</p>
          <p>错误信息：${err.message}</p>
        `);
      } else {
        taskFile(ctx, stats, indexPath);
      }
    });
    return;
  }

  let content = `<h2>目录 ${ctx.pathname}</h2>`;
  dirents.forEach((dirent) => {
    let { name } = dirent;
    let href = posix.join(ctx.pathname, name);
    if (dirent.isDirectory()) {
      href += "/";
      name += "/";
    }
    content += `<p><a href="${href}">${name}</a></p>`;
  });
  ctx.html(content);
  ctx.app.log.info(`static dir -> ${staticPath}`);
}

/**
 * 响应缓存
 * @param ctx
 * @param staticPath
 */
export function outCache(ctx: Context, staticPath: string) {
  ctx.status(304).res.end();
  ctx.app.log.info(`static cache -> ${staticPath}`);
}

/**
 * 响应范围文件
 * @param ctx
 * @param opt
 */
export function outRange(
  ctx: Context,
  opt: {
    size: number;
    staticPath: string;
    range: string;
  }
) {
  const { res } = ctx;
  //解析范围
  const range = parseRange(opt.range, opt.size);

  //判断范围是否存在
  if (range) {
    const { start, end } = range;
    res.setHeader("Content-Range", `bytes ${start}-${end}/${opt.size}`);
    res.setHeader("Content-Length", end - start + 1);
    const stream = createReadStream(opt.staticPath, { start, end });

    ctx.status(206);
    stream.pipe(res);
    ctx.app.log.info(`static range -> ${opt.staticPath}`);
  } else {
    //范围不存在
    res.removeHeader("Content-Length");
    res.setHeader("Content-Range", `bytes */${opt.size}`);
    ctx.status(416);
    res.end();
    ctx.app.log.error(new Error("range 416"), opt.staticPath);
  }
}

/**
 * 响应压缩文件
 * @param ctx
 * @param staticPath
 * @param encoding
 * @returns
 */
export function outZip(ctx: Context, staticPath: string, encoding: string) {
  const { res } = ctx;

  let zipstream: Gzip | Deflate | null = null;

  //满足服务器支持的压缩类型
  if (encoding.match(/\bgzip\b/)) {
    res.setHeader("Content-Encoding", "gzip");
    zipstream = createGzip();
  }

  if (encoding.match(/\bdeflate\b/)) {
    res.setHeader("Content-Encoding", "deflate");
    zipstream = createDeflate();
  }

  if (!zipstream) {
    return outFile(ctx, staticPath);
  }

  //数据需要压缩，分块传输，所以无法得知数据体的真实大小
  //所有要删除Content-Length属性
  res.setHeader("Transfer-Encoding", "chunked");
  res.removeHeader("Content-Length");
  ctx.status(200);

  const stream = createReadStream(staticPath);
  stream.pipe(zipstream).pipe(res);
  ctx.app.log.info(`static zip -> ${staticPath}`);
}

/**
 * 命中Mime
 * 把字符串断言到Mime类型
 * @param key
 */
export function hitMime(key: string): key is keyof typeof MimeTypes {
  return Object.keys(MimeTypes).includes(key);
}

export const MimeTypes = {
  ogg: "audio/ogg",
  mp4: "video/mp4",
  css: "text/css",
  gif: "image/gif",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "application/javascript",
  json: "application/json",
  pdf: "application/pdf",
  png: "image/png",
  svg: "image/svg+xml",
  swf: "application/x-shockwave-flash",
  tiff: "image/tiff",
  plain: "text/plain",
  wav: "audio/x-wav",
  wma: "audio/x-ms-wma",
  wmv: "video/x-ms-wmv",
  xml: "text/xml",
  "octet-stream": "application/octet-stream",
} as const;

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
 * 是否命中压缩类型
 * @param ctx
 * @param staticPath
 */
export function isHitZipType(ctx: Context, staticPath: string) {
  const extName = posix.extname(staticPath);
  //满足服务器设定的压缩文件范围
  if (dsopt.canZipFile.includes(extName.slice(1))) {
    return false;
  }

  //客户端支持的压缩类型
  const encoding = ctx.req.headers["accept-encoding"]?.toString();
  if (!encoding) return false;
  return encoding;
}

/**
 * 解析请求范围
 * 格式要求: Content-Range: bytes=start-end
 * 如果文件 bytelength=10， 全部范围: bytes=0-9 ，
 * bytes=x-x 表示第x字节的内容
 * bytes=0- 表示全部范围
 *
 * 不支持以下格式
 * Range: <unit>=<range-start>-<range-end>, <range-start>-<range-end>
 *
 * @param range
 * @param size 文件大小
 */
export function parseRange(
  range: string,
  size: number
): {
  start: number;
  end: number;
} | null {
  const matched = range.match(/^bytes=(\d+)-(\d*)$/);
  //格式不正确
  if (!matched) return null;

  const start = parseInt(matched[1]);

  //兼容bytes=0-，这种格式
  const end = matched[2] === "" ? size - 1 : parseInt(matched[2]);

  if (start >= 0 && start <= end && end < size) {
    //合理范围
    return { start, end };
  } else {
    //不存在的范围
    return null;
  }
}
