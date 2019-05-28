import { ServerResponse } from "http";

/**
 * 设置cookie 不能设置中文
 * @param cookie Cookie
 */
export default function setCookie(cookie: Cookie): void {
  const { res, key, value, maxAge, domain, path, expires, httpOnly, secure } = cookie
  let pairs: Array<string> = [key + '=' + value]
  if (maxAge) pairs.push('Max-Age=' + maxAge)
  if (domain) pairs.push('Domain=' + domain)
  if (path) pairs.push('Path=' + path)
  if (expires) pairs.push('Expires=' + expires.toUTCString())
  if (httpOnly) pairs.push('HttpOnly')
  if (secure) pairs.push('Secure')
  const cur: string = pairs.join('; ')
  const pre: string | number | string[] = res.getHeader('set-cookie')
  if (!pre) {
    return res.setHeader('Set-Cookie', cur)
  }
  if (typeof pre === 'string') {
    return res.setHeader('Set-Cookie', [pre, cur])
  }
  if (Array.isArray(pre)) {
    return res.setHeader('Set-Cookie', [...pre, cur])
  }
}

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