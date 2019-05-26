"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @restart 关机
class ShutDown {
    GET(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(`服务器将在10s后关闭！`);
        process.send({ type: 'SHUT_DOWN' });
    }
}
ShutDown.PATH = '/api/shutdown';
exports.default = ShutDown;
//# sourceMappingURL=ShutDown.js.map