import { IncomingMessage, ServerResponse } from "node:http";
import { join } from "node:path";
import { NicestOpt } from "../index.js";

export class Context {
  /**请求发起的时间 */
  startTime: number
  /**请求url对象 */
  url: URL
  /**相对路径 */
  pathname: string
  /**静态资源路径 */
  staticPath = '/'
  /**默认渲染的html文件名 */
  indexPageName = 'index.html'
  constructor(
    public req: IncomingMessage,
    public res: ServerResponse,
    public opt: NicestOpt
  ) {
    this.startTime = Date.now()

    const domain = (opt.https ? 'https://' : 'http://') + opt.host + ':' + opt.port

    this.url = new URL(join(domain, req.url ?? '/'))
    //浏览器url可能会对中文转码
    this.pathname = decodeURI(this.url.pathname)    
  }

  setStaticPath(path: string) {
    this.staticPath = path
  }

  setIndexPageName(name: string) {
    this.indexPageName = name
  }
}