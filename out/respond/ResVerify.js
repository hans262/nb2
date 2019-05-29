"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = require("../conf");
const cache_1 = require("../utils/cache");
const mime_1 = require("../utils/mime");
const zip_1 = require("../utils/zip");
const ResCache_1 = require("./ResCache");
const ResFile_1 = require("./ResFile");
const ResRange_1 = require("./ResRange");
const ResZip_1 = require("./ResZip");
function ResVerify(req, res) {
    const { __absolutePath, __stats } = req;
    const { size, mtime } = __stats;
    if (cache_1.isCache(req))
        return ResCache_1.default(req, res);
    res.setHeader('Last-Modified', mtime.toUTCString());
    const expire = (new Date(Date.now() + conf_1.CACHE_MAX_AGE * 1000)).toUTCString();
    res.setHeader('Expires', expire);
    res.setHeader('Cache-Control', `public, max-age=${conf_1.CACHE_MAX_AGE}`);
    res.setHeader('ETag', cache_1.generateETag(__stats));
    res.setHeader('Content-Type', mime_1.mime(__absolutePath) + '; charset=utf-8');
    res.setHeader('Content-Length', size);
    if (req.headers['range'])
        return ResRange_1.default(req, res);
    if (!zip_1.isZip(req, res)) {
        return ResFile_1.default(req, res);
    }
    ResZip_1.default(req, res);
}
exports.default = ResVerify;
//# sourceMappingURL=ResVerify.js.map