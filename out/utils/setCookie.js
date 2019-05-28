"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 设置cookie 不能设置中文
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
    const cur = pairs.join('; ');
    const pre = res.getHeader('set-cookie');
    if (!pre) {
        return res.setHeader('Set-Cookie', cur);
    }
    if (typeof pre === 'string') {
        return res.setHeader('Set-Cookie', [pre, cur]);
    }
    if (Array.isArray(pre)) {
        return res.setHeader('Set-Cookie', [...pre, cur]);
    }
}
exports.default = setCookie;
//# sourceMappingURL=setCookie.js.map