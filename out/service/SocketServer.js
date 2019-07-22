"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const conf_1 = require("../conf");
const server = net_1.createServer();
server.on('connection', (socket) => {
    socket.on('data', (data) => {
        socket.write(data);
    });
});
server.on('error', (err) => {
    console.log(err);
});
server.listen(conf_1.SOCKET_SERVER_PORT, () => {
    console.log('socket server is listening on port -> ' + conf_1.SOCKET_SERVER_PORT);
});
//# sourceMappingURL=SocketServer.js.map