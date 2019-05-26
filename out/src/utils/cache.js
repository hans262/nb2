"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 生成ETag
 * @param {object} stats
 */
function generateETag(stats) {
    var mtime = stats.mtime.getTime().toString(16); //16进制
    var size = stats.size.toString(16);
    return "W/\"" + mtime + "-" + size + "\"";
}
exports.generateETag = generateETag;
/**
 * 验证缓存
 * @param {object} req
 */
function isCache(req) {
    var headers = req.headers, stats = req.stats;
    var mtime = stats.mtime;
    var noneMatch = headers['if-none-match']; //ETag
    var lastModified = headers['if-modified-since']; //最后修改时间
    if (!(noneMatch || lastModified))
        return false;
    if (noneMatch !== generateETag(stats))
        return false;
    if (lastModified !== mtime.toUTCString())
        return false;
    return true;
}
exports.isCache = isCache;
//# sourceMappingURL=cache.js.map