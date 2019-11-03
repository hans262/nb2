"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../modules/logger");
class Restart {
    constructor() {
        this.PATH_NAME = '/api/restart';
    }
    GET(_, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(`服务器将在10后，平滑重启，不影响使用体验`);
        logger_1.SEND({ type: 'RE_START' });
    }
}
exports.Restart = Restart;
//# sourceMappingURL=Restart.js.map