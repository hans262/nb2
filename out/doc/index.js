"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const server = net_1.createServer((c) => {
    c.on('end', () => {
        console.log('客户端已断开连接');
    });
    c.on('data', data => {
        console.log(data.toString());
    });
    setTimeout(() => {
        c.write('你好');
    }, 2000);
});
server.on('error', (err) => {
    console.log(err);
});
server.listen(8888, () => {
    console.log('服务器已启动');
});
const client = net_1.createConnection({ port: 8888, host: '127.0.0.1', timeout: 1000 }, () => {
    client.write('world!');
});
client.on('error', err => {
    console.log(err);
});
client.on('timeout', () => {
    console.log('超时');
});
client.on('data', (data) => {
    console.log(data.toString());
});
client.on('end', () => {
    console.log('与服务器断开连接');
});
//# sourceMappingURL=index.js.map