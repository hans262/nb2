import { IncomingMessage, ServerResponse } from "node:http";
import { extname, join } from "node:path";
import { WebServer, ServerOpt } from "../webserver.js";
import { bufferSplit } from "./utils.js";
import { Logger } from "./logger.js";

export class Context {
  /**请求发起时间戳 */
  startTime = Date.now();
  /**请求ur对象 */
  url: URL;
  /**http请求路径 */
  pathname: string;
  constructor(
    public req: IncomingMessage,
    public res: ServerResponse,
    public opt: ServerOpt,
    public app: WebServer
  ) {
    //解析url
    this.url = new URL(join(app.domain, req.url ?? "/"));

    //浏览器url可能会对中文转码 decodeURIComponent
    this.pathname = decodeURI(this.url.pathname);
  }

  /**
   * 完全匹配路由，包括尾部'/'，
   * 支持通配符['*', ':id']，代替任意字符
   */
  matchRoutes(path: string) {
    const rexp = new RegExp(`^${path.replaceAll(/(\*+)|(:[^/]+)/g, "[^/]+")}$`);
    return rexp.test(this.pathname);
  }

  /**
   * 根据资源路径获取Content-Type
   * @param path
   */
  getContentTypeOfPath(path: string) {
    const ext = extname(path).slice(1);
    if (isMime(ext)) {
      return MimeTypes[ext] + "; charset=utf-8";
    } else {
      return MimeTypes["plain"] + "; charset=utf-8";
    }
  }

  /**
   * 获取Content-Type
   * @param type
   */
  getContentType(type: keyof typeof MimeTypes) {
    return MimeTypes[type] + "; charset=utf-8";
  }

  /**
   * 接收body数据
   */
  async getBodyData<T extends "string" | "buffer" | "json">(type: T) {
    return new Promise<BodyRet<T>>((resolve) => {
      const chunks: Buffer[] = [];
      this.req.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });
      this.req.on("end", () => {
        if (type === "buffer") {
          resolve(Buffer.concat(chunks) as BodyRet<T>);
        }
        if (type === "string") {
          resolve(Buffer.concat(chunks).toString() as BodyRet<T>);
        }
        if (type === "json") {
          const ret = Buffer.concat(chunks).toString();
          resolve(JSON.parse(ret) as BodyRet<T>);
        }
      });
    });
  }

  /**
   * 获取cookie
   * @param key
   */
  getCookie(key: string) {
    let cookie = this.req.headers["cookie"];
    if (!cookie) return null;
    cookie = decodeURIComponent(cookie);
    const rexp = new RegExp(`${key}=([^;]+)`);
    const value = cookie.match(rexp)?.[1];
    return value;
  }

  /**
   * 设置cookie
   * @param cookie
   */
  setCookie(
    key: string,
    value: string,
    opt?: {
      maxAge?: string;
      domain?: string;
      path?: string;
      expires?: Date;
      httpOnly?: boolean;
      secure?: boolean;
    }
  ) {
    let pairs = [key + "=" + encodeURIComponent(value)];
    if (opt?.maxAge) pairs.push("Max-Age=" + opt.maxAge);
    if (opt?.domain) pairs.push("Domain=" + opt.domain);
    if (opt?.path) pairs.push("Path=" + opt.path);
    if (opt?.expires) pairs.push("Expires=" + opt.expires.toUTCString());
    if (opt?.httpOnly) pairs.push("HttpOnly");
    if (opt?.secure) pairs.push("Secure");
    const ret = pairs.join("; ");
    //之前有设置过的地方
    const pre =
      (this.res.getHeader("set-cookie") as string[] | undefined) ?? [];
    this.res.setHeader("Set-Cookie", [...pre, ret]);
  }

  /**
   * 设置statusCode
   * @param code
   */
  statusCode(code: number) {
    this.res.statusCode = code;
    return this;
  }

  /**
   * 响应json
   * @param opt
   */
  json(opt: { [key: string]: any }) {
    this.res.setHeader("Content-Type", this.getContentType("json"));
    this.res.end(JSON.stringify(opt));
  }

  /**
   * 响应纯文本
   * @param text
   */
  text(text: string) {
    this.res.setHeader("Content-Type", this.getContentType("plain"));
    this.res.end(text);
  }

  /**
   * 响应html
   * @param text
   */
  html(text: string) {
    this.res.setHeader("Content-Type", this.getContentType("html"));
    this.res.end(text);
  }

  /**
   * 重定向
   */
  redirect(url: string, code: number) {
    this.statusCode(code);
    this.res.setHeader("Location", url);
    this.res.end();

    Logger.self.stdlog({
      level: "redirect",
      color: "cyan",
      logPath: this.opt.logDir,
      msg: this.pathname + " -> " + url,
    });
  }

  /**
   * 解析FormData数据
   * @param buf
   * @param boundary
   * @param contentLength
   */
  parseFormData(buf: Buffer, boundary: string, contentLength: number) {
    const result: FormData[] = [];

    //中间标志
    const midBoundary = "\r\n--" + boundary + "\r\n";
    //开始标志
    const startBoundary = Buffer.from("--" + boundary + "\r\n");
    //结束标志
    const endBoundary = Buffer.from("\r\n--" + boundary + "--\r\n");
    //空对象的全部内容
    const nullContent = Buffer.from("--" + boundary + "--\r\n");

    //空类容检查 'FormData对象内容为空'
    if (contentLength <= nullContent.byteLength) {
      return result;
    }

    //去掉首尾
    const temp = buf.subarray(
      startBoundary.byteLength,
      buf.byteLength - endBoundary.byteLength
    );
    //文件分割
    const bufs = bufferSplit(temp, midBoundary);
    for (const buf of bufs) {
      // console.log(buf.toString())
      let index = buf.indexOf("\r\n", 0);

      const lineOne = buf.subarray(0, index).toString();

      const [_, filename] = lineOne.match(/filename="([^;]+)"/) ?? [];
      const [__, name] = lineOne.match(/name="([^;]+)"/) ?? [];

      let ContentType: FormData["ContentType"];

      if (filename) {
        //文件多一行content-type
        const tmp = buf.indexOf("\r\n", index + 2);
        const lineTwo = buf.subarray(index + 2, tmp).toString();
        const [__, ct] = lineTwo.match(/Content-Type:\s([^;]+)/) ?? [];
        ContentType = ct;

        index = tmp + 4;
      } else {
        index += 4;
      }
      const data = buf.subarray(index);

      result.push({ name, filename, data, ContentType });
    }
    return result;
  }
}

/**
 * 把字符串断言到Mime类型
 * @param key
 */
export function isMime(key: string): key is keyof typeof MimeTypes {
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
 * 支持的请求方法
 */
export type Method = "GET" | "POST" | "PUT" | "DELETE";
export const Methods: Method[] = ["GET", "POST", "PUT", "DELETE"];

/**
 * 中间件类型
 */
export type Middleware = (ctx: Context, next: () => void) => void;

export interface FormData {
  name: string;
  /**文件才有，没有就是纯数据 */
  filename?: string;
  ContentType?: string;
  data: Buffer;
}

type BodyRet<T> = T extends "string"
  ? string
  : T extends "buffer"
  ? Buffer
  : T extends "json"
  ? { [key: string]: any }
  : never;
