"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = require("net");
class SocketPool {
    constructor(options) {
        this.MAX_LIMIT = 10;
        this.MIN_LIMIT = 2;
        this.PORT = 9999;
        this.HOST = '0.0.0.0';
        this.CONNECTIONS = [];
        this.current = 0;
        const { max, min, port, host } = options;
        this.MAX_LIMIT = max ? max : this.MAX_LIMIT;
        this.MIN_LIMIT = min ? min : this.MIN_LIMIT;
        this.PORT = port ? port : this.PORT;
        this.HOST = host ? host : this.HOST;
        this.initConnections();
    }
    initConnections() {
        for (let i = 0; i < this.MIN_LIMIT; i++) {
            this.createSocket(socket => {
                this.current = this.CONNECTIONS.push(socket);
            });
        }
    }
    createSocket(fn) {
        const socket = net_1.createConnection({ port: this.PORT, host: this.HOST });
        socket.on('connect', () => {
            fn(socket);
        });
        socket.on('close', (err) => {
            console.log(err);
            socket.destroy();
        });
        socket.on('error', (err) => {
            console.log(err);
            socket.destroy();
        });
    }
    getConnection(fn) {
        const socket = this.CONNECTIONS.shift();
        if (!socket) {
            if (this.current >= this.MAX_LIMIT) {
                return fn(new Error('超出最大连接数'));
            }
            this.createSocket(socket => {
                fn(null, socket);
            });
        }
        else {
            this.current -= 1;
            fn(null, socket);
        }
    }
    release(socket) {
        this.current = this.CONNECTIONS.push(socket);
    }
}
const sp = new SocketPool({ port: 9999 });
setTimeout(() => {
    sp.getConnection((err, socket) => {
        if (err || !socket)
            return;
        socket.write('hello');
        socket.on('data', data => {
            console.log(data.toString());
            sp.release(socket);
        });
    });
}, 1000);
//# sourceMappingURL=SocketPool.js.map