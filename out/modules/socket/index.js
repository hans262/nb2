"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocketPool {
    constructor(options) {
        this.max = 10;
        this.min = 1;
        this.port = 9999;
        this.host = '0.0.0.0';
        this.connections = [];
    }
    createSocket() {
    }
}
//# sourceMappingURL=index.js.map