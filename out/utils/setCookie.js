"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param {object} res
 * @param {string} key 键
 * @param {string} val 值
 * @param {*} opt
 */
function setCookie(res, key, val, opt) {
    let pairs = [key + '=' + val];
    let o = opt ? opt : {};
    if (o.maxAge)
        pairs.push('Max-Age=' + o.maxAge);
    if (o.domain)
        pairs.push('Domain=' + o.domain);
    if (o.path)
        pairs.push('Path=' + o.path);
    if (o.expires)
        pairs.push('Expires=' + o.expires.toGMTString());
    if (o.httpOnly)
        pairs.push('HttpOnly');
    if (o.secure)
        pairs.push('Secure');
    const result = pairs.join('; ');
    res.setHeader('Set-Cookie', result);
}
exports.default = setCookie;
//# sourceMappingURL=setCookie.js.map