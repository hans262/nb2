/**
 * 获取cookie
 * @param {object} req 
 * @param {string} key 键
 */
export default function getCookie(req, key) {
  const { cookie } = req.headers
  if (!cookie) return null
  const reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
  const arr = cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}