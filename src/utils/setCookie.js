/**
 * 目前只支持设置一个cookie值
 * @param {object} res 
 * @param {string} key 键
 * @param {string} val 值 
 * @param {*} opt 
 */
function setCookie(res, key, val, opt={}) {
  const pairs = [key + '=' + val]
  if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge)
  if (opt.domain) pairs.push('Domain=' + opt.domain)
  if (opt.path) pairs.push('Path=' + opt.path)
  if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString())
  if (opt.httpOnly) pairs.push('HttpOnly')
  if (opt.secure) pairs.push('Secure')
  const result = pairs.join('; ')
  res.setHeader('Set-Cookie', result)
}

module.exports = setCookie
