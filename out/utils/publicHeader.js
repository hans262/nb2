"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = require("../conf");
function publicHeader(res) {
    res.setHeader('Server', 'NodeJs Server/1.0 (Linux)');
    res.setHeader('Content-language', 'zh-CN, en-US');
    res.setHeader('Vary', 'Accept-Encoding, User-Agent');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Connection', 'keep-alive');
    if (conf_1.CROSS) {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
}
exports.publicHeader = publicHeader;
//# sourceMappingURL=publicHeader.js.map