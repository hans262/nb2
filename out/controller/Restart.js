"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../modules/log");
// @restart 重启
class Restart {
    GET(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(`服务器将在10后，平滑重启，不影响使用体验`);
        log_1.SEND({ type: 'RE_START' });
    }
}
Restart.PATH = '/api/restart';
exports.default = Restart;
//# sourceMappingURL=Restart.js.map