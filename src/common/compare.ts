import posix from "node:path/posix";
import { Context } from "./context.js";
import { Stats } from "node:fs";

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
  if (!ctx.opt.static!.canZipFile!.includes(extName.slice(1))) {
    return false;
  }

  //客户端支持的压缩类型
  const encoding = ctx.req.headers["accept-encoding"]?.toString();
  if (!encoding) return false;
  return encoding;
}
