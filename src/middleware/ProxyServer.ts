import { ClientRequest, IncomingMessage, request, RequestOptions, ServerResponse } from "http";
import { parse, UrlWithStringQuery } from "url";
import { Middleware } from "../Interface/Middleware";
import { Req } from "../Interface/Req";

const proxyConfig = {
  pathname: '/proxy',
  proxyUrl: 'http://127.0.0.1:7777'
} as const

/**
 * 目前只支持http的代理url
 * 需支持https需更换request模块
 * @param req 
 * @param res 
 * @param next 
 */
export const ProxyServer: Middleware = (
  req: Req, res: ServerResponse, next: Function
): void => {
  const { method, __relativePath } = req
  const { pathname, proxyUrl } = proxyConfig
  const matched: RegExpMatchArray | null = __relativePath!.match(
    new RegExp(`^(${pathname}|${pathname}\/.*)$`)
  )
  if (!matched) return next()
  const url: UrlWithStringQuery = parse(proxyUrl)

  const options: RequestOptions = {
    method: method,
    hostname: url.hostname,
    port: url.port,
    path: __relativePath,
    headers: req.headers
  }

  const preq: ClientRequest = request(options, (pres: IncomingMessage) => {
    res.writeHead(res.statusCode, pres.headers)
    pres.pipe(res)
  })
  req.pipe(preq)
  preq.on('error', err => {
    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end('请求代理服务器失败，' + err.message)
    preq.destroy()
  })
}