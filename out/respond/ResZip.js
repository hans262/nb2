"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const zlib_1 = require("zlib");
const conf_1 = require("../conf");
const log_1 = require("../modules/log");
function isZip(absolutePath) {
    const type = path_1.extname(absolutePath);
    const matched = type.match(conf_1.ZIP_MATCH); //压缩范围
    return matched;
}
function ResZip(req, res) {
    const { absolutePath } = req;
    let stream = fs_1.createReadStream(absolutePath);
    if (isZip(absolutePath)) {
        //需要压缩
        //客户端支持的压缩类型
        //数据需要压缩，分块传输，所以无法得知数据体的真实大小
        //所有要删除Content-Length属性
        res.setHeader('Transfer-Encoding', 'chunked');
        res.removeHeader('Content-Length');
        const ZipType = req.headers['accept-encoding'].toString();
        if (ZipType.match(/\bgzip\b/)) {
            res.setHeader('Content-Encoding', 'gzip');
            stream = stream.pipe(zlib_1.createGzip());
        }
        else if (ZipType.match(/\bdeflate\b/)) {
            res.setHeader('Content-Encoding', 'deflate');
            stream = stream.pipe(zlib_1.createDeflate());
        }
        log_1.LOG({ type: 'RES_ZIP', msg: absolutePath });
    }
    else {
        log_1.LOG({ type: 'RES_FILE', msg: absolutePath });
    }
    res.writeHead(200, 'OK');
    stream.pipe(res);
}
exports.default = ResZip;
//# sourceMappingURL=ResZip.js.map