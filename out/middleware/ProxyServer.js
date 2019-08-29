"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const url_1 = require("url");
const proxyConfig = {
    pathname: '/proxy',
    proxyUrl: 'http://127.0.0.1:7777'
};
exports.ProxyServer = (req, res, next) => {
    const { method, __relativePath } = req;
    const { pathname, proxyUrl } = proxyConfig;
    const matched = __relativePath.match(new RegExp(`^(${pathname}|${pathname}\/.*)$`));
    if (!matched)
        return next();
    const url = url_1.parse(proxyUrl);
    const options = {
        method: method,
        hostname: url.hostname,
        port: url.port,
        path: req.url,
        headers: req.headers
    };
    const server = http_1.request(options, (response) => {
        const { statusCode = 200 } = response;
        res.writeHead(statusCode, response.headers);
        response.pipe(res);
    });
    req.pipe(server);
    server.on('error', err => {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end('请求代理服务器失败，' + err.message);
        server.destroy();
    });
};
//# sourceMappingURL=ProxyServer.js.map