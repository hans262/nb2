import { ServerResponse, IncomingMessage } from "node:http";

export interface Cookie {
  res: ServerResponse
  key: string
  value: string
  maxAge?: string
  domain?: string
  path?: string
  expires?: Date
  httpOnly?: boolean
  secure?: boolean
}

/**
 * 获取cookie
 * @param req 
 * @param key 键
 */
export function getCookie(req: IncomingMessage, key: string): string | null {
  const { cookie } = req.headers
  if (!cookie) return null
  const reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
  const arr = cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}

/**
 * 设置cookie 不支持中文
 * @param cookie Cookie
 */
export function setCookie(cookie: Cookie) {
  const { res, key, value, maxAge, domain, path, expires, httpOnly, secure } = cookie
  let pairs = [key + '=' + value]
  if (maxAge) pairs.push('Max-Age=' + maxAge)
  if (domain) pairs.push('Domain=' + domain)
  if (path) pairs.push('Path=' + path)
  if (expires) pairs.push('Expires=' + expires.toUTCString())
  if (httpOnly) pairs.push('HttpOnly')
  if (secure) pairs.push('Secure')
  const cur = pairs.join('; ')
  const pre = res.getHeader('set-cookie')
  if (pre) {
    Array.isArray(pre) ?
      res.setHeader('Set-Cookie', [...pre, cur]) :
      res.setHeader('Set-Cookie', [pre as string, cur])
  } else {
    res.setHeader('Set-Cookie', [cur])
  }
}
