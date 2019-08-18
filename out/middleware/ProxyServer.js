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
        path: __relativePath,
        headers: req.headers
    };
    const preq = http_1.request(options, (pres) => {
        res.writeHead(res.statusCode, pres.headers);
        pres.pipe(res);
    });
    req.pipe(preq);
    preq.on('error', err => {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end('请求代理服务器失败，' + err.message);
        preq.destroy();
    });
};
//# sourceMappingURL=ProxyServer.js.map