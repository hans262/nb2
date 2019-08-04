"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const configure_1 = require("../configure");
function RUN() {
    let sockets = [];
    const server = net_1.createServer();
    server.on('connection', (socket) => {
        sockets.push(socket);
        socket.on('data', (data) => {
            socket.write(data);
        });
    });
    server.on('error', (err) => {
        console.log(err);
    });
    server.listen(configure_1.SOCKET_SERVER_PORT, () => {
        console.log('socket server is listening on port -> ' + configure_1.SOCKET_SERVER_PORT);
    });
    process.on('uncaughtException', err => {
        console.log(err);
        sockets = sockets.filter(s => !s.destroyed && s.readable && s.writable);
    });
}
RUN();
//# sourceMappingURL=SocketServer.js.map