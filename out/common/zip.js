"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const zlib_1 = require("zlib");
const configure_1 = require("../configure");
function isZip(req, res) {
    const { __absolutePath } = req;
    const type = path_1.extname(__absolutePath);
    const matched = type.match(configure_1.ZIP_MATCH);
    if (!matched)
        return false;
    let acceptEncoding = req.headers['accept-encoding'];
    if (!acceptEncoding)
        return false;
    const EncodeType = acceptEncoding.toString();
    if (EncodeType.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip');
        req.__zipstream = zlib_1.createGzip();
        return true;
    }
    if (EncodeType.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate');
        req.__zipstream = zlib_1.createDeflate();
        return true;
    }
    return false;
}
exports.isZip = isZip;
//# sourceMappingURL=zip.js.map