import { Dirent, createReadStream, readdirSync, stat } from "node:fs";
import posix from "node:path/posix";
import { Deflate, Gzip, createDeflate, createGzip } from "node:zlib";
import { Context } from "./common/context.js";
import { taskFile } from "./middleware.js";
import { Logger, parseRange } from "./common/utils.js";

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
    Logger.self.log({ level: "error", path: staticPath, msg: err.message });
  });
  ctx.status(200);
  stream.pipe(res);

  Logger.self.log({ level: "static", path: staticPath });
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
    ctx.status(403).html(`
      <h2>权限错误</h2>
      <p>无法访问该路径：${ctx.pathname}</p>
      <p>错误信息：${error.message}</p>
    `);
    Logger.self.log({
      level: "error",
      path: staticPath,
      msg: "权限错误",
    });
    return;
  }

  // 检查index.html文件是否存在
  if (dirents.find((d) => d.name === ctx.opt.static!.indexName)) {
    const indexPath = posix.join(staticPath, ctx.opt.static!.indexName!);
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
  Logger.self.log({
    level: "static",
    path: staticPath,
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
  /**
   * spa应用路由模式
   * 需把404 -> root/index.html
   * 检查是否支持静态资源响应
   * 注意检查该文件是否存在，避免造成死循环
   * 这里拼接root/index.html路径
   */
  if (ctx.opt.static?.spa) {
    const indexPath = posix.join(
      ctx.opt.static.root,
      ctx.opt.static!.indexName!
    );
    stat(indexPath, (_, stats) => {
      if (stats?.isFile()) {
        taskFile(ctx, stats, indexPath);
        return;
      }
      ctx.status(404).html(`
        <h2>404</h2>
        <p>你的spa应用没有正确存放index.html文件</p>
      `);
    });
    return;
  }

  ctx.status(404).html(`
    <h2>404</h2>
    <p>${path} ${opt?.reason ?? "当前路径不存在。"} </p>
  `);
  Logger.self.log({
    level: "info",
    path: path,
    msg: "notfound",
  });
};

/**
 * 响应缓存
 * @param ctx
 * @param staticPath
 */
export function outCache(ctx: Context, staticPath: string) {
  ctx.status(304).res.end();
  Logger.self.log({
    level: "static",
    path: staticPath,
    msg: "cache",
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
    Logger.self.log({
      level: "static",
      path: opt.staticPath,
      msg: "range",
    });
  } else {
    //范围不存在
    res.removeHeader("Content-Length");
    res.setHeader("Content-Range", `bytes */${opt.size}`);
    ctx.status(416);
    res.end();
    Logger.self.log({
      level: "error",
      path: opt.staticPath,
      msg: "range 416",
    });
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
  Logger.self.log({
    level: "static",
    path: staticPath,
  });
}

/**
 * 响应500
 * @param ctx
 * @param err
 */
export const out500 = (ctx: Context, err: Error) => {
  ctx.status(500).html(`
    <h2>500 Error</h2>
    <p>${err}</p>
  `);
  Logger.self.log({
    level: "error",
    path: ctx.pathname,
    msg: err as any,
  });
};
