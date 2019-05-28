"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.Server({ port: 8888 });
wss.on('connection', function (ws) {
    ws.send('you are user ' + wss.clients.size);
    ws.on('message', function (msg) {
        console.log(msg);
        wss.clients.forEach(client => {
            client.send(msg);
        });
    });
});
//# sourceMappingURL=ws.js.map