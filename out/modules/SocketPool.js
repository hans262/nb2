"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
class SocketPool {
    constructor(options) {
        this.LIMIT = 20;
        this.HOST = '0.0.0.0';
        this.TIMEOUT = 2000;
        this.CONNECTIONS = [];
        this.CURRENT = 0;
        const { port, limit, host, timeout } = options;
        this.PORT = port;
        this.LIMIT = limit ? limit : this.LIMIT;
        this.HOST = host ? host : this.HOST;
        this.TIMEOUT = timeout ? timeout : this.TIMEOUT;
    }
    createSocket(fn) {
        const socket = net_1.createConnection({ port: this.PORT, host: this.HOST });
        const id = setTimeout(() => {
            socket.destroy();
            fn(new Error('创建连接时连接超时，请稍后再试'));
        }, this.TIMEOUT);
        socket.on('connect', () => {
            clearTimeout(id);
            this.CURRENT++;
            fn(null, socket);
        });
        socket.on('error', (err) => {
            socket.destroy();
            fn(err);
        });
    }
    getConnection(fn) {
        const socket = this.CONNECTIONS.shift();
        if (!socket) {
            if (this.CURRENT >= this.LIMIT) {
                return fn(new Error('超出了最大连接数，无法创建新的连接，请等待再继续获取连接。。'));
            }
            return this.createSocket((err, socket) => {
                if (err)
                    return fn(err);
                fn(null, socket);
            });
        }
        if (!socket.readable || !socket.writable) {
            socket.destroy();
            this.CURRENT--;
            return this.createSocket((err, socket) => {
                if (err)
                    return fn(err);
                fn(null, socket);
            });
        }
        fn(null, socket);
    }
    release(socket) {
        this.CONNECTIONS.push(socket);
    }
}
exports.SocketPool = SocketPool;
//# sourceMappingURL=SocketPool.js.map