"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../modules/log");
exports.default = new class Restart {
    constructor() {
        this.PATH = '/api/restart';
    }
    GET(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(`服务器将在10后，平滑重启，不影响使用体验`);
        log_1.SEND({ type: 'RE_START' });
    }
};
//# sourceMappingURL=Restart.js.map