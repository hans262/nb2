import { Req } from "../Interface/Req";

/**
 * 获取cookie
 * @param req 
 * @param key 键
 */
export default function getCookie(req: Req, key: string): string {
  const { cookie } = req.headers
  if (!cookie) return null
  const reg: RegExp = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
  const arr: RegExpMatchArray = cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}