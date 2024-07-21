import { IncomingMessage, ServerResponse } from "node:http";
import posix from "node:path/posix";
import { _ServerOpt, Dopx } from "../dopx.js";
import { bufferSplit } from "./utils.js";
import { hitMime, MimeTypes } from "./compare.js";
import { _FormData, BodyData } from "./model.js";

export class Context {
  /**请求发起时间戳 */
  startTime = Date.now();
  /**请求ur对象 */
  url: URL;
  /**url查询参数 */
  query: { [key: string]: string };
  /**url参数 */
  params: { [key: string]: string } = {};
  /**http请求路径 */
  pathname: string;
  /**自定义数据 */
  custom: { [key: string]: any } = {};
  constructor(
    public req: IncomingMessage,
    public res: ServerResponse,
    public opt: _ServerOpt,
    public app: Dopx
  ) {
    //解析url
    this.url = new URL(posix.join(app.domain, req.url ?? "/"));
    // 解析查询参数
    this.query = Object.fromEntries(this.url.searchParams);
    //浏览器url可能会对中文转码 decodeURIComponent
    this.pathname = decodeURI(this.url.pathname);
    //服务器时间
    res.setHeader("Date", new Date().toUTCString());
  }

  /**
   * 匹配路由，包函解析参数
   * 去除尾部'/'的比较
   * 支持通配符: *, :id
   * 直接把params参数解析出来
   */
  matchRoutes(path: string): {
    matched: boolean;
    params: { [key: string]: string };
  } {
    path = path.endsWith("/") ? path.slice(0, -1) : path;
    const pathname = this.pathname.endsWith("/")
      ? this.pathname.slice(0, -1)
      : this.pathname;
    const rexp = new RegExp(`^${path.replaceAll(/(\*+)|(:[^/]+)/g, "[^/]+")}$`);
    const matched = rexp.test(pathname);

    // 解析url参数 (?<id>[^/]+)
    if (matched) {
      const pm2 = path.match(/:([^/]+)/g);
      if (pm2?.length) {
        let regStr = path;
        pm2.forEach((v) => {
          regStr = regStr.replace(v, `(?<${v.slice(1)}>[^/]+)`);
        });
        const pm3 = pathname.match(new RegExp(regStr));
        const params = { ...pm3?.groups };
        return { matched, params };
      }
    }

    return { matched, params: {} };
  }

  /**
   * 根据资源路径获取Content-Type
   * @param path
   */
  getContentTypeOfPath(path: string) {
    const ext = posix.extname(path).slice(1);
    if (hitMime(ext)) {
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
  async body<T extends "string" | "buffer" | "json">(type: T) {
    return new Promise<BodyData<T>>((resolve) => {
      const chunks: Buffer[] = [];
      this.req.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });
      this.req.on("end", () => {
        if (type === "buffer") {
          resolve(Buffer.concat(chunks) as BodyData<T>);
        }
        if (type === "string") {
          resolve(Buffer.concat(chunks).toString() as BodyData<T>);
        }
        if (type === "json") {
          const ret = Buffer.concat(chunks).toString();
          resolve(JSON.parse(ret) as BodyData<T>);
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
   * @param key
   * @param value
   * @param opt
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
  status(code: number) {
    this.res.statusCode = code;
    return this;
  }

  /**
   * 响应json
   * @param opt
   * @param status
   */
  json<T extends { [key: string]: any }>(opt: T, status = 200) {
    this.res.setHeader("Content-Type", this.getContentType("json"));
    this.status(status);
    this.res.end(JSON.stringify(opt));
  }

  /**
   * 响应纯文本
   * @param text
   * @param status
   */
  text(text: string, status = 200) {
    this.res.setHeader("Content-Type", this.getContentType("plain"));
    this.status(status);
    this.res.end(text);
  }

  /**
   * 响应html
   * @param text
   * @param status
   */
  html(text: string, status = 200) {
    this.res.setHeader("Content-Type", this.getContentType("html"));
    this.status(status);
    this.res.end(text);
  }

  /**
   * 重定向
   * 301 永久
   * 302 临时
   */
  redirect(url: string, code = 302) {
    this.status(code);
    this.res.setHeader("Location", url);
    this.res.end();
  }

  /**
   * 解析FormData数据
   * @param buf
   * @param boundary
   * @param contentLength
   */
  parseFormData(buf: Buffer, boundary: string, contentLength: number) {
    const result: _FormData[] = [];

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

      let ContentType: _FormData["ContentType"];

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
