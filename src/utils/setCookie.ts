import { ServerResponse } from "http";

/**
 * 设置cookie
 * @param cookie Cookie
 */
export default function setCookie(cookie: Cookie) {
  const { res, key, value, maxAge, domain, path, expires, httpOnly, secure } = cookie
  let pairs: Array<string> = [key + '=' + value]
  if (maxAge) pairs.push('Max-Age=' + maxAge)
  if (domain) pairs.push('Domain=' + domain)
  if (path) pairs.push('Path=' + path)
  if (expires) pairs.push('Expires=' + expires.toUTCString())
  if (httpOnly) pairs.push('HttpOnly')
  if (secure) pairs.push('Secure')
  const result: string = pairs.join('; ')
  res.setHeader('Set-Cookie', result)
}

interface Cookie {
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