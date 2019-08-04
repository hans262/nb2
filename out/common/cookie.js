"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCookie(req, key) {
    const { cookie } = req.headers;
    if (!cookie)
        return null;
    const reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    const arr = cookie.match(reg);
    return arr ? unescape(arr[2]) : null;
}
exports.getCookie = getCookie;
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
    if (pre) {
        Array.isArray(pre) ?
            res.setHeader('Set-Cookie', [...pre, cur]) :
            res.setHeader('Set-Cookie', [pre, cur]);
    }
    else {
        res.setHeader('Set-Cookie', [cur]);
    }
}
exports.setCookie = setCookie;
//# sourceMappingURL=cookie.js.map