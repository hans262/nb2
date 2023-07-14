import { IncomingMessage, ServerResponse } from "node:http";
import { join } from "node:path";
import { WebServer, ServerOpt } from "../webserver.js";

export class Context {
  /**请求发起时间戳 */
  startTime = Date.now()
  /**请求ur对象 */
  url: URL
  /**http请求路径 */
  pathname: string
  constructor(
    public req: IncomingMessage,
    public res: ServerResponse,
    public opt: ServerOpt,
    public app: WebServer
  ) {
    const domain = (opt.https ? 'https://' : 'http://') + opt.host + ':' + opt.port
    this.url = new URL(join(domain, req.url ?? '/'))
    //浏览器url可能会对中文转码
    this.pathname = decodeURI(this.url.pathname)
  }
}