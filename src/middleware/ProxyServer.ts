import * as http from "http";
import * as https from "https";
import { parse } from "url";
import { proxyConfig } from "../configure";
import { Middleware } from "../Interface/Middleware";
import { Req } from "../Interface/Req";

/**
 * 代理中间件
 * @param req 
 * @param res 
 * @param next 
 */
export const ProxyServer: Middleware = (
  req: Req, res: http.ServerResponse, next: () => void
): void => {
  const { method, __relativePath } = req
  const cf = Object.entries(proxyConfig).find(v => __relativePath!.match(
    new RegExp(`^(${v[0]}|${v[0]}\/.*)$`)
  ))
  if (!cf) return next()

  const [, proxyUrl] = cf
  const url = parse(proxyUrl)
  //没有http类型信息
  if (!url.protocol) return next()

  const request = url.protocol === 'https:' ? https.request : http.request
  //https携带headers需要客户端证书认证
  const headers = url.protocol === 'https:' ? undefined : req.headers

  const options: https.RequestOptions = {
    protocol: url.protocol,
    method: method,
    hostname: url.hostname,
    port: url.port,
    path: req.url,
    headers: headers
  }

  const server = request(options, response => {
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