"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const get = {
    protocol: 'http:',
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/get?haha=dwq',
    method: 'GET',
    timeout: 5000
};
const postData = 'hello world';
const post = {
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
const req = http_1.request(post, (res) => {
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
//# sourceMappingURL=request.js.map