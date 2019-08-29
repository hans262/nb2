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
  req: Req, res: ServerResponse, next: () => void
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
    path: req.url,
    headers: req.headers
  }

  const server: ClientRequest = request(options, (response: IncomingMessage) => {
    const { statusCode = 200 } = response
    res.writeHead(statusCode, response.headers)
    response.pipe(res)
  })
  req.pipe(server)
  server.on('error', err => {
    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end('请求代理服务器失败，' + err.message)
    server.destroy()
  })
}