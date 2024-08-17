import { stat } from "node:fs";
import { Context } from "./context.js";
import { dsopt, taskFile } from "./statics.js";
import { posix } from "node:path";

/**
 * buffer 分割
 * @param buffer 需要分割的buffer
 * @param spl
 */
export function bufferSplit(buffer: Buffer, spl: string): Buffer[] {
  const result: Buffer[] = [];
  let offset = 0,
    index = 0;
  while ((index = buffer.indexOf(spl, offset)) !== -1) {
    result.push(buffer.subarray(offset, index));
    offset = index + spl.length;
  }
  result.push(buffer.subarray(offset));
  return result.filter((b) => b.byteLength);
}
/**
 * const buffer = Buffer.from('\r\n大青蛙私たち\r\n一天の一夜他\r\n我看iirftgr\r\n')
 * const ret = bufferSplit(buffer, '\r\n')
 */

/**
 * 日志对象
 */
export class Logger {
  constructor(private conf: ("error" | "info")[]) {}

  private dcolor = {
    red: "\x1B[31m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    blue: "\x1B[34m",
    bluegreen: "\x1B[36m",
    reset: "\x1B[0m",
  };

  info(msg: string, color: "green" | "yellow" = "green") {
    if (!this.conf.includes("info")) return;
    const date = this.formatDate();
    let mq = `${date} ${process.pid} ${msg}`;
    mq = this.dcolor[color] + mq + this.dcolor["reset"];
    console.log(mq);
  }

  error(err: Error, path?: string) {
    if (!this.conf.includes("error")) return;
    const date = this.formatDate();
    let mq = `${date} ${process.pid}`;
    mq = path ? mq + "path -> " + path : mq;
    mq = mq + `\n${err.stack}`;
    mq = this.dcolor["red"] + mq + this.dcolor["reset"];
    console.log(mq);
  }

  private formatDate() {
    const d = new Date();
    return `${d.getFullYear()}-${
      d.getUTCMonth() + 1
    }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }
}

export function sfn() {
  return Symbol();
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
  ctx.app.log.error(err);
};

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
  if (dsopt.spa) {
    const indexPath = posix.join(dsopt.root, "index.html");
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
  ctx.app.log.info(`path -> notfound`);
};
