"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取cookie
 * @param req
 * @param key 键
 */
function getCookie(req, key) {
    const { cookie } = req.headers;
    if (!cookie)
        return null;
    const reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    const arr = cookie.match(reg);
    return arr ? unescape(arr[2]) : null;
}
exports.default = getCookie;
//# sourceMappingURL=getCookie.js.map