import * as http from "node:http";
import * as https from "node:https";
import { Middleware } from "../../src/index.js";
import { proxyConfig } from "../common/constant.js";

/**
 * 代理中间件
 * @param ctx 
 * @param next 
 */
export const proxy: Middleware = (ctx, next) => {
  const { req, pathname, res } = ctx

  const hitKey = Object.keys(proxyConfig)
    .find(k => k === pathname) as (keyof typeof proxyConfig) | undefined

  if (hitKey) {
    const url = new URL(proxyConfig[hitKey] + hitKey + ctx.url.search)
    // console.log(url)

    //选择协议
    const request = url.protocol === 'https:' ? https.request : http.request

    const proxyReq = request({
      protocol: url.protocol,
      method: req.method,
      hostname: url.hostname,
      port: url.port,
      search: url.search,
      pathname: hitKey,
      // timeout: 5000, 可监听timeout事件
      rejectUnauthorized: false //关闭https客户端认证
    }, response => {

      res.writeHead(response.statusCode ?? 200, response.headers)
      response.pipe(res)
    })

    req.pipe(proxyReq)

    proxyReq.on('error', err => {
      proxyReq.destroy()
      ctx.statusCode(400).text('请求代理服务器失败，' + err.message)
    })
    return
  }

  next()
}