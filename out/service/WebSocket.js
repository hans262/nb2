"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const conf_1 = require("../conf");
function RUN() {
    const wss = new ws_1.Server({ port: conf_1.WEB_SOCKET_PORT });
    wss.on('connection', ws => {
        const userId = wss.clients.size;
        console.log(`用户 ${userId} 进来了`);
        ws.send(`你是用户： ${userId}`);
        ws.on('message', msg => {
            console.log(msg);
            wss.clients.forEach(client => {
                client.send(msg);
            });
        });
    });
}
RUN();
//# sourceMappingURL=WebSocket.js.map