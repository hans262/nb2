"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const net_1 = require("net");
const DataFrame_1 = require("../common/DataFrame");
const configure_1 = require("../configure");
const bufferSplit_1 = require("../modules/bufferSplit");
const server = net_1.createServer();
server.on('connection', (socket) => socket.once('data', socket_once));
server.listen(configure_1.WEB_SOCKET_PORT);
const sockets = new Map();
function socket_once(data) {
    const headers = parse_headers(data);
    if (headers.Upgrade !== 'websocket') {
        return this.end();
    }
    if (headers["Sec-WebSocket-Version"] !== '13') {
        return this.end();
    }
    const KEY = headers['Sec-WebSocket-Key'];
    if (!KEY)
        return this.end();
    this.write(accept_headers(compute_accept(KEY)));
    this.on('data', on_socket_data);
    const socket_id = Date.now() + Math.random();
    sockets.set(socket_id, this);
    console.log(sockets);
    this.on('end', () => {
        sockets.delete(socket_id);
        this.destroy();
    });
}
function on_socket_data(data) {
    const frame = DataFrame_1.decodeDataFrame(data);
    console.log(frame);
    if (frame.Opcode === 8) {
        return this.end();
    }
    if (frame.Opcode === 9) {
        return this.write(Buffer.concat([
            Buffer.from([0b10001010, frame.PayloadLength]),
            frame.PayloadData
        ]));
    }
    if (frame.Opcode === 1) {
        sockets.forEach(s => s.write(DataFrame_1.encodeDataFrame(frame)));
    }
}
function compute_accept(KEY) {
    const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    const hash = crypto_1.createHash('sha1');
    hash.update(KEY + GUID);
    return hash.digest('base64');
}
function accept_headers(accept) {
    const headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-Websocket-Accept: ' + accept + '\r\n\r\n'
    ];
    return headers.join('\r\n');
}
function parse_headers(data) {
    const ret = bufferSplit_1.bufferSplit(data, '\r\n');
    const headers = {};
    ret.slice(1).forEach(v => {
        const r2 = bufferSplit_1.bufferSplit(v, ': ');
        const [key, value] = r2;
        if (!key || !value)
            return;
        headers[key.toString()] = value.toString();
    });
    return headers;
}
//# sourceMappingURL=WebSocket.js.map