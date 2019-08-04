"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configure_1 = require("../configure");
const cache_1 = require("../common/cache");
const mime_1 = require("../common/mime");
const zip_1 = require("../common/zip");
const ResCache_1 = require("./ResCache");
const ResFile_1 = require("./ResFile");
const ResRange_1 = require("./ResRange");
const ResZip_1 = require("./ResZip");
function ResVerify(req, res) {
    const { __absolutePath, __stats } = req;
    const { size, mtime } = __stats;
    if (cache_1.isCache(req))
        return ResCache_1.ResCache(req, res);
    res.setHeader('Last-Modified', mtime.toUTCString());
    const expire = (new Date(Date.now() + configure_1.CACHE_MAX_AGE * 1000)).toUTCString();
    res.setHeader('Expires', expire);
    res.setHeader('Cache-Control', `public, max-age=${configure_1.CACHE_MAX_AGE}`);
    res.setHeader('ETag', cache_1.generateETag(__stats));
    res.setHeader('Content-Type', mime_1.mime(__absolutePath) + '; charset=utf-8');
    res.setHeader('Content-Length', size);
    if (req.headers['range'])
        return ResRange_1.ResRange(req, res);
    if (!zip_1.isZip(req, res)) {
        return ResFile_1.ResFile(req, res);
    }
    ResZip_1.ResZip(req, res);
}
exports.ResVerify = ResVerify;
//# sourceMappingURL=ResVerify.js.map