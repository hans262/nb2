"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const server = net_1.createServer();
server.on('connection', (socket) => {
    socket.on('data', (data) => {
        console.log(server);
        socket.write(data);
    });
});
server.on('error', (err) => {
    console.log(err);
});
server.listen(9999, () => {
    console.log('socket server is listening');
});
const socket = net_1.createConnection({ port: 9999, host: '127.0.0.1' });
socket.on('connect', () => {
    socket.write('hello socket!');
});
socket.on('error', (err) => {
    console.log(err);
});
socket.on('data', (data) => {
    console.log(data.toString());
});
socket.on('end', () => {
    console.log('socket connect is closed');
});
//# sourceMappingURL=net.js.map