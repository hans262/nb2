"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
http_1.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end('代理服务器的响应类容');
}).listen(7777);
//# sourceMappingURL=index.js.map