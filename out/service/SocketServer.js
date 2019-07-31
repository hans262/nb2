"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const conf_1 = require("../conf");
function RUN() {
    let sockets = [];
    const server = net_1.createServer();
    server.on('connection', (socket) => {
        sockets.push(socket);
        socket.on('data', (data) => {
            socket.write(data);
        });
        console.log(sockets);
    });
    server.on('error', (err) => {
        console.log(err);
    });
    server.listen(conf_1.SOCKET_SERVER_PORT, () => {
        console.log('socket server is listening on port -> ' + conf_1.SOCKET_SERVER_PORT);
    });
    process.on('uncaughtException', err => {
        console.log(err);
        sockets = sockets.filter(s => !s.destroyed && s.readable && s.writable);
    });
}
RUN();
//# sourceMappingURL=SocketServer.js.map