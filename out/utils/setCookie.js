"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 设置cookie
 * @param cookie Cookie
 */
function setCookie(cookie) {
    const { res, key, value, maxAge, domain, path, expires, httpOnly, secure } = cookie;
    let pairs = [key + '=' + value];
    if (maxAge)
        pairs.push('Max-Age=' + maxAge);
    if (domain)
        pairs.push('Domain=' + domain);
    if (path)
        pairs.push('Path=' + path);
    if (expires)
        pairs.push('Expires=' + expires.toUTCString());
    if (httpOnly)
        pairs.push('HttpOnly');
    if (secure)
        pairs.push('Secure');
    const result = pairs.join('; ');
    res.setHeader('Set-Cookie', result);
}
exports.default = setCookie;
//# sourceMappingURL=setCookie.js.map