"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const logger_1 = require("../modules/logger");
function ResZip(req, res) {
    const { __absolutePath, __zipstream } = req;
    res.setHeader('Transfer-Encoding', 'chunked');
    res.removeHeader('Content-Length');
    const stream = fs_1.createReadStream(__absolutePath);
    res.writeHead(200, 'Compressed file');
    stream.pipe(__zipstream).pipe(res);
    logger_1.DEBUG({ type: 'RES_ZIP', msg: __absolutePath });
}
exports.ResZip = ResZip;
//# sourceMappingURL=ResZip.js.map