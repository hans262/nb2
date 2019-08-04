import { ServerResponse } from "http";
import { Req } from "../Interface/Req";

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
 * fetch cookie
 * @param req 
 * @param key 键
 */
export function getCookie(req: Req, key: string): string | null {
  const { cookie } = req.headers
  if (!cookie) return null
  const reg: RegExp = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
  const arr: RegExpMatchArray | null = cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}

/**
 * set cookie, not Chinese
 * @param cookie Cookie
 */
export function setCookie(cookie: Cookie): void {
  const { res, key, value, maxAge, domain, path, expires, httpOnly, secure } = cookie
  let pairs: Array<string> = [key + '=' + value]
  if (maxAge) pairs.push('Max-Age=' + maxAge)
  if (domain) pairs.push('Domain=' + domain)
  if (path) pairs.push('Path=' + path)
  if (expires) pairs.push('Expires=' + expires.toUTCString())
  if (httpOnly) pairs.push('HttpOnly')
  if (secure) pairs.push('Secure')
  const cur: string = pairs.join('; ')
  const pre: string | number | string[] | undefined = res.getHeader('set-cookie')
  if (pre) {
    Array.isArray(pre) ?
      res.setHeader('Set-Cookie', [...pre, cur]) :
      res.setHeader('Set-Cookie', [pre as string, cur])
  } else {
    res.setHeader('Set-Cookie', [cur])
  }
}
