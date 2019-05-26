"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../modules/log");
// @restart 关机
class ShutDown {
    GET(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(`服务器将在10s后关闭！`);
        log_1.SEND({ type: 'SHUT_DOWN' });
    }
}
ShutDown.PATH = '/api/shutdown';
exports.default = ShutDown;
//# sourceMappingURL=ShutDown.js.map