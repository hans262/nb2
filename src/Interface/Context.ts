import { IncomingMessage, ServerResponse } from "node:http";
import { join } from "node:path";
import { DOMAIN, STATIC_PATH } from "../configure/index.js";

export class Context {
  startTime: number //请求开始时间
  url: URL
  pathname: string
  staticPath: string
  constructor(
    public req: IncomingMessage,
    public res: ServerResponse
  ) {
    this.startTime = Date.now()
    this.url = new URL(join(DOMAIN, req.url ?? '/'))
    //相对路径，浏览器url可能会对中文转码
    this.pathname = decodeURI(this.url.pathname)
    //绝对路径，拼接一个静态资源路径
    this.staticPath = join(STATIC_PATH, this.pathname)
  }
  setAbsolutePath(p: string) {
    this.staticPath = p
  }
}