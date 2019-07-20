"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
function it(config) {
    const { body, method, path } = config;
    if (!path.startsWith('/')) {
        config.path = '/' + path;
    }
    return new Promise((resolve, reject) => {
        const req = http_1.request(config, (res) => {
            const { statusCode = 400 } = res;
            const chunks = [];
            res.on('data', (chunk) => {
                chunks.push(chunk);
            });
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                resolve({ statusCode, response: buffer, url: path, method });
            });
        });
        req.on('error', (err) => {
            reject(err);
        });
        if (method === 'POST' && body) {
            req.write(body);
        }
        req.end();
    });
}
exports.it = it;
//# sourceMappingURL=request.js.map