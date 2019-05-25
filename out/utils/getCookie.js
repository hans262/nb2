"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取cookie
 * @param {object} req
 * @param {string} key 键
 */
function getCookie(req, key) {
    var cookie = req.headers.cookie;
    if (!cookie)
        return null;
    var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    var arr = cookie.match(reg);
    return arr ? unescape(arr[2]) : null;
}
exports.default = getCookie;
//# sourceMappingURL=getCookie.js.map