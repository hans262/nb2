import { Dirent, createReadStream, existsSync, readdirSync } from "node:fs";
import { posix } from "node:path";
import { Deflate, Gzip, createDeflate, createGzip } from "node:zlib";
import { Context } from "./common/context.js";
import { staticTask } from "./middleware.js";
import { Logger } from "./common/logger.js";

/**
 * 响应文件
 * @param ctx
 * @param staticPath
 */
export function outFile(ctx: Context, staticPath: string) {
  const { startTime, res } = ctx;
  const stream = createReadStream(staticPath);
  ctx.statusCode(200);
  stream.pipe(res);
  Logger.self.stdlog({
    level: "file",
    color: "green",
    logPath: ctx.opt.logDir,
    msg: staticPath + " +" + (Date.now() - startTime) + "ms",
  });
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
  } catch (error: any) {
    //证明该文件夹无法打开，可能存在权限等问题。
    ctx.statusCode(200).html(`
      <h1>目录 ${ctx.pathname}</h1>
      <p style="color:red;">目录访问失败：${error.message}</p>
    `);
    Logger.self.stdlog({
      level: "dir_fail",
      color: "red",
      logPath: ctx.opt.logDir,
      msg: staticPath + " +" + (Date.now() - ctx.startTime) + "ms",
    });
    return;
  }

  /**
   * 检查目录下index.html文件是否存在
   * 若存在则渲染该文件，需要重新拼接资源路径
   */
  if (dirents.find((d) => d.name === ctx.opt.static!.indexFileName)) {
    return staticTask(
      ctx,
      posix.join(staticPath, ctx.opt.static!.indexFileName!)
    );
  }

  let content = `<h1>目录 ${ctx.pathname}</h1>`;
  dirents.forEach((dirent) => {
    let { name } = dirent;
    let href = posix.join(ctx.pathname, name);
    if (dirent.isDirectory()) {
      href += "/";
      name += "/";
    }
    content += `<p><a href="${href}">${name}</a></p>`;
  });
  ctx.statusCode(200).html(content);
  Logger.self.stdlog({
    level: "dir",
    color: "green",
    logPath: ctx.opt.logDir,
    msg: staticPath + " +" + (Date.now() - ctx.startTime) + "ms",
  });
}

/**
 * 响应404
 * @param ctx
 * @param opt
 */
export const out404 = (
  ctx: Context,
  opt?: {
    staticPath?: string;
    reason?: string;
  }
) => {
  const path = opt?.staticPath ?? ctx.pathname;
  if (ctx.opt.static && ctx.opt.static.spa) {
    /**
     * spa应用路由模式
     * 需把404内容，返回 root/index.html文件
     * 检查是否支持静态资源响应
     * 注意检查该文件是否存在，避免造成死循环
     * 这里拼接root/index.html路径
     */
    const reactIndexPath = posix.join(
      ctx.opt.static.root,
      ctx.opt.static!.indexFileName!
    );
    if (existsSync(reactIndexPath)) {
      return staticTask(ctx, reactIndexPath);
    }
  }
  ctx.statusCode(404).html(`
    <h1>404</h1>
  	<p>${path} ${opt?.reason ?? "当前路径不存在。"} </p>
  `);

  Logger.self.stdlog({
    level: "404",
    color: "red",
    logPath: ctx.opt.logDir,
    msg: path + " +" + (Date.now() - ctx.startTime) + "ms",
  });
};

/**
 * 响应缓存
 * @param ctx
 * @param staticPath
 */
export function outCache(ctx: Context, staticPath: string) {
  ctx.statusCode(304).res.end();
  Logger.self.stdlog({
    level: "cache",
    color: "cyan",
    logPath: ctx.opt.logDir,
    msg: staticPath + " +" + (Date.now() - ctx.startTime) + "ms",
  });
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
  const { startTime, res } = ctx;
  //解析范围
  const range = parseRange(opt.range, opt.size);

  //判断范围是否存在
  if (range) {
    const { start, end } = range;
    res.setHeader("Content-Range", `bytes ${start}-${end}/${opt.size}`);
    res.setHeader("Content-Length", end - start + 1);
    const stream = createReadStream(opt.staticPath, { start, end });

    ctx.statusCode(206);
    stream.pipe(res);
    Logger.self.stdlog({
      level: "range",
      color: "green",
      logPath: ctx.opt.logDir,
      msg: opt.staticPath + " +" + (Date.now() - startTime) + "ms",
    });
  } else {
    res.removeHeader("Content-Length");
    res.setHeader("Content-Range", `bytes */${opt.size}`);
    ctx.statusCode(416);
    res.end();
    Logger.self.stdlog({
      level: "range_416",
      color: "red",
      logPath: ctx.opt.logDir,
      msg: opt.staticPath + " +" + (Date.now() - startTime) + "ms",
    });
  }
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

/**
 * 响应压缩文件
 * @param ctx
 * @param staticPath
 * @param encoding
 * @returns
 */
export function outZip(ctx: Context, staticPath: string, encoding: string) {
  const { startTime, res } = ctx;

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
  ctx.statusCode(200);

  const stream = createReadStream(staticPath);
  stream.pipe(zipstream).pipe(res);
  Logger.self.stdlog({
    level: "zip",
    color: "green",
    logPath: ctx.opt.logDir,
    msg: staticPath + " +" + (Date.now() - startTime) + "ms",
  });
}
