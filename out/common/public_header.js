"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configure_1 = require("../configure");
function public_header(res) {
    res.setHeader('Server', 'NodeJs Server/1.0 (Linux)');
    res.setHeader('Content-language', 'zh-CN, en-US');
    res.setHeader('Vary', 'Accept-Encoding, User-Agent');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Connection', 'keep-alive');
    if (configure_1.CROSS) {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
}
exports.public_header = public_header;
//# sourceMappingURL=public_header.js.map