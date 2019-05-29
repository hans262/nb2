"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateETag(stats) {
    const mtime = stats.mtime.getTime().toString(16);
    const size = stats.size.toString(16);
    return `W/"${mtime}-${size}"`;
}
exports.generateETag = generateETag;
function isCache(req) {
    const { headers, __stats } = req;
    const { mtime } = __stats;
    const noneMatch = headers['if-none-match'];
    const lastModified = headers['if-modified-since'];
    if (!(noneMatch || lastModified))
        return false;
    if (noneMatch !== generateETag(__stats))
        return false;
    if (lastModified !== mtime.toUTCString())
        return false;
    return true;
}
exports.isCache = isCache;
//# sourceMappingURL=cache.js.map