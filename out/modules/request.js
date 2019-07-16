"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
function it(config) {
    const { body, method } = config;
    return new Promise((resolve, reject) => {
        const req = http_1.request(config, (res) => {
            const { statusCode } = res;
            if (!statusCode) {
                return reject('statusCode no exist!');
            }
            if (statusCode < 200 || statusCode >= 400) {
                return reject('statusCode = ' + statusCode);
            }
            const chunks = [];
            res.on('data', (chunk) => {
                chunks.push(chunk);
            });
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                resolve(buffer);
            });
        });
        req.on('error', (err) => {
            reject(err);
        });
        if (method && method === 'POST' && body) {
            req.write(body);
        }
        req.end();
    });
}
exports.it = it;
;
(async () => {
    try {
        const ret = await it({
            hostname: '127.0.0.1',
            port: 5000,
            path: '/api/post',
            method: 'POST',
            timeout: 1500,
            body: 'hello world'
        });
        console.log(ret.toString());
    }
    catch (err) {
        console.log(err);
    }
})();
//# sourceMappingURL=request.js.map