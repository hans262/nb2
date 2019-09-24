"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../modules/logger");
class ShutDown {
    constructor() {
        this.PATH_NAME = '/api/shutdown';
    }
    GET(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(`服务器将在10s后关闭！`);
        logger_1.SEND({ type: 'SHUT_DOWN' });
    }
}
exports.ShutDown = ShutDown;
//# sourceMappingURL=ShutDown.js.map