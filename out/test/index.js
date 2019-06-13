"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const url = '/api/getuser';
const proxy = 'http://www.baidu.com';
const postData = 'hello world';
const options = {
    protocol: 'http:',
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/post',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    },
    timeout: 5000
};
const req = http_1.request(options, (res) => {
    const { statusCode, headers } = res;
    console.log(statusCode);
    console.log(headers);
    const chunks = [];
    res.on('data', (chunk) => {
        chunks.push(chunk);
    });
    res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        console.log(buffer.toString());
    });
});
req.on('error', (err) => {
    console.error(err);
});
req.write(postData);
req.end();
//# sourceMappingURL=index.js.map