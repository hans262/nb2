"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
const url_1 = require("url");
const configure_1 = require("../configure");
exports.ProxyServer = (req, res, next) => {
    const { method, __relativePath } = req;
    const cf = Object.entries(configure_1.proxyConfig).find(v => __relativePath.match(new RegExp(`^(${v[0]}|${v[0]}\/.*)$`)));
    if (!cf)
        return next();
    const [, proxyUrl] = cf;
    const url = url_1.parse(proxyUrl);
    if (!url.protocol)
        return next();
    const request = url.protocol === 'https:' ? https.request : http.request;
    const headers = url.protocol === 'https:' ? undefined : req.headers;
    const options = {
        protocol: url.protocol,
        method: method,
        hostname: url.hostname,
        port: url.port,
        path: req.url,
        headers: headers
    };
    const server = request(options, response => {
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