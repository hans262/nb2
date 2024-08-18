import { IncomingMessage, ServerResponse } from "node:http";
import posix from "node:path/posix";
import { Nb2 } from "./nb2.js";

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
    public app: Nb2
  ) {
    //解析url
    this.url = new URL(posix.join(app.cname, req.url || "/"));
    // 解析查询参数
    this.query = Object.fromEntries(this.url.searchParams);
    //浏览器url可能会对中文转码
    this.pathname = decodeURI(this.url.pathname);
    //服务器时间
    res.setHeader("Date", new Date().toUTCString());
  }

  /**
   * 匹配路由，包函解析param参数
   * 忽略尾部'/'
   * 通配符: *, :id
   * @param path
   */
  matchRoute(path: string): {
    hit: boolean;
    params: { [key: string]: string };
  } {
    const pathname = this.pathname;
    const rexp = new RegExp(
      `^${
        path
          .replace(/\*/g, "[^/]*") // 处理星号通配符
          .replace(/:(\w+)/g, "(?<$1>[^/]+)") // 处理参数占位符
          .replace(/\/$/, "(/?)") // 处理尾部斜杠
      }(/?)$`
    );
    const matched = pathname.match(rexp);
    if (matched) {
      return { hit: true, params: { ...matched.groups } };
    }
    return { hit: false, params: {} };
  }

  /**
   * 解析body数据
   * @param type
   * @param limit byte
   * @returns
   */
  async body<T extends "string" | "buffer" | "json">(
    type: T,
    limit = 1024 * 1024
  ) {
    return new Promise<BodyData<T>>((resolve, reject) => {
      let dataLength = 0;
      const chunks: Buffer[] = [];
      let dataListener: any;
      dataListener = (chunk: Buffer) => {
        dataLength += chunk.length;
        if (dataLength > limit) {
          this.req.removeListener("data", dataListener);
          reject(new Error(`数据超过最大尺寸 ${limit} 了。`));
        } else {
          chunks.push(chunk);
        }
      };
      this.req.on("data", dataListener);
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
    let cookies = this.req.headers["cookie"];
    if (!cookies) return null;
    cookies = decodeURIComponent(cookies);
    const rexp = new RegExp(`${key}=([^;]*)`);
    return cookies.match(rexp)?.[1];
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
      expires?: Date;
      domain?: string;
      path?: string;
      httpOnly?: boolean;
      secure?: boolean;
    }
  ) {
    let pairs = [key + "=" + encodeURIComponent(value)];
    if (opt?.maxAge) pairs.push("Max-Age=" + opt.maxAge);
    if (opt?.expires) pairs.push("Expires=" + opt.expires.toUTCString());
    if (opt?.domain) pairs.push("Domain=" + opt.domain);
    if (opt?.path) pairs.push("Path=" + opt.path);
    if (opt?.httpOnly) pairs.push("HttpOnly");
    if (opt?.secure) pairs.push("Secure");
    const cookies = pairs.join("; ");
    const exists = (this.res.getHeader("set-cookie") as string[]) || [];
    this.res.setHeader("Set-Cookie", [...exists, cookies]);
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
    this.res.setHeader("Content-Type", "application/json; charset=utf-8");
    this.status(status);
    this.res.end(JSON.stringify(opt));
  }

  /**
   * 响应纯文本
   * @param text
   * @param status
   */
  text(text: string, status = 200) {
    this.res.setHeader("Content-Type", "text/plain; charset=utf-8");
    this.status(status);
    this.res.end(text);
  }

  /**
   * 响应html
   * @param text
   * @param status
   */
  html(text: string, status = 200) {
    this.res.setHeader("Content-Type", "text/html; charset=utf-8");
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
}

export type BodyData<T> = T extends "string"
  ? string
  : T extends "buffer"
  ? Buffer
  : T extends "json"
  ? { [key: string]: any }
  : never;
