"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
const bufferSplit_1 = require("../modules/bufferSplit");
const crypto_1 = require("crypto");
const server = net_1.createServer();
server.on('connection', (socket) => socket.once('data', socket_once));
server.listen(8888);
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
    const frame = decodeDataFrame(data);
    console.log(frame);
    if (frame.Opcode === 8) {
        return this.end();
    }
    sockets.forEach(s => s.write(encodeDataFrame(frame)));
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
        'Sec-Websocket-Accept: ' + accept + '\r\n\r\n',
    ];
    return headers.join('\r\n');
}
function decodeDataFrame(e) {
    let i = 0, j, s;
    const frame = {
        FIN: e[i] >> 7,
        Opcode: e[i++] & 15,
        Mask: e[i] >> 7,
        PayloadLength: e[i++] & 0x7F,
        PayloadData: ''
    };
    if (frame.PayloadLength == 126) {
        frame.PayloadLength = (e[i++] << 8) + e[i++];
    }
    if (frame.PayloadLength == 127) {
        i += 4;
        frame.PayloadLength = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++];
    }
    if (frame.Mask) {
        frame.MaskingKey = [e[i++], e[i++], e[i++], e[i++]];
        s = Buffer.alloc(frame.PayloadLength);
        for (j = 0; j < frame.PayloadLength; j++) {
            s[j] = e[i + j] ^ frame.MaskingKey[j % 4];
        }
    }
    else {
        s = e.slice(i, frame.PayloadLength);
    }
    frame.PayloadData = s.toString();
    return frame;
}
function encodeDataFrame(e) {
    let s = [], o = Buffer.from(e.PayloadData), l = o.length;
    s.push((e.FIN << 7) + e.Opcode);
    if (l < 126)
        s.push(l);
    else if (l < 0x10000)
        s.push(126, (l & 0xFF00) >> 2, l & 0xFF);
    else
        s.push(127, 0, 0, 0, 0, (l & 0xFF000000) >> 6, (l & 0xFF0000) >> 4, (l & 0xFF00) >> 2, l & 0xFF);
    return Buffer.concat([Buffer.from(s), o]);
}
//# sourceMappingURL=index.js.map