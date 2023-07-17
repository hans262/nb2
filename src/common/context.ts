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
    //decodeURIComponent
    this.pathname = decodeURI(this.url.pathname)
  }

  /**
   * 接收body数据
   * @param ctx 
   */
  async getBodyData() {
    return new Promise<Buffer>((resolve) => {
      const chunks: Buffer[] = []
      this.req.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })
      this.req.on('end', () => {
        resolve(Buffer.concat(chunks))
      })
    })
  }

  /**
   * 获取cookie
   * @param key
   */
  getCookie(key: string) {
    let cookie = this.req.headers['cookie']
    if (!cookie) return null
    cookie = decodeURIComponent(cookie)
    const rexp = new RegExp(`${key}=([^;]+)`)
    const value = cookie.match(rexp)?.[1]
    return value
  }

  /**
   * 设置cookie
   * @param cookie
   */
  setCookie(key: string, value: string, opt?: {
    maxAge?: string
    domain?: string
    path?: string
    expires?: Date
    httpOnly?: boolean
    secure?: boolean
  }) {
    let pairs = [key + '=' + encodeURIComponent(value)]
    if (opt?.maxAge) pairs.push('Max-Age=' + opt.maxAge)
    if (opt?.domain) pairs.push('Domain=' + opt.domain)
    if (opt?.path) pairs.push('Path=' + opt.path)
    if (opt?.expires) pairs.push('Expires=' + opt.expires.toUTCString())
    if (opt?.httpOnly) pairs.push('HttpOnly')
    if (opt?.secure) pairs.push('Secure')
    const ret = pairs.join('; ')
    //之前有设置过的地方
    const pre = (this.res.getHeader('set-cookie') as string[] | undefined) ?? []
    this.res.setHeader('Set-Cookie', [...pre, ret])
  }
}