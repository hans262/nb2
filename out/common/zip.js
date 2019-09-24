"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const configure_1 = require("../configure");
function getZipType(req, res) {
    const { __absolutePath } = req;
    const type = path_1.extname(__absolutePath);
    const matched = type.match(configure_1.ZIP_MATCH);
    if (!matched)
        return null;
    let acceptEncoding = req.headers['accept-encoding'];
    if (!acceptEncoding)
        return null;
    const EncodeType = acceptEncoding.toString();
    if (EncodeType.match(/\bgzip\b/)) {
        return 'GZIP';
    }
    if (EncodeType.match(/\bdeflate\b/)) {
        return 'DEFLATE';
    }
    return null;
}
exports.getZipType = getZipType;
//# sourceMappingURL=zip.js.map