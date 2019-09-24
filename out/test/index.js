"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../common/path");
const options = {
    hostname: 'www.baidu.com',
    port: 443,
    path: '/',
    method: 'GET'
};
const req = https_1.request(options, res => {
    console.log('状态码:', res.statusCode);
    console.log('请求头:', res.headers);
    const chunks = [];
    res.on('data', (d) => {
        chunks.push(d);
    });
    res.on('end', () => {
        const data = Buffer.concat(chunks);
        fs_1.writeFileSync(path_1.join(path_2.PUBLIC_PATH, './baidu.html'), data);
    });
});
req.on('error', (e) => {
    console.error(e);
});
req.end();
//# sourceMappingURL=index.js.map