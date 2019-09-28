"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const logger_1 = require("../modules/logger");
const zlib_1 = require("zlib");
function ResZip(req, res, zipType) {
    const { __absolutePath, __startTime } = req;
    res.setHeader('Transfer-Encoding', 'chunked');
    res.removeHeader('Content-Length');
    const stream = fs_1.createReadStream(__absolutePath);
    let zipstream;
    if (zipType === 'GZIP') {
        res.setHeader('Content-Encoding', 'gzip');
        zipstream = zlib_1.createGzip();
    }
    else {
        res.setHeader('Content-Encoding', 'deflate');
        zipstream = zlib_1.createDeflate();
    }
    res.writeHead(200, 'Compressed file');
    stream.pipe(zipstream).pipe(res);
    logger_1.DEBUG({
        type: 'RES_ZIP',
        msg: __absolutePath + ' +' + (Date.now() - __startTime) + 'ms'
    });
}
exports.ResZip = ResZip;
//# sourceMappingURL=ResZip.js.map