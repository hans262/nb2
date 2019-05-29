"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LOG(massage) {
    const { type, msg, pid = process.pid } = massage;
    const date = new Date().toLocaleString();
    console.info(`[${date}] [${type}] pid: ${pid} -> ${msg}`);
}
exports.LOG = LOG;
function SEND(cmd) {
    const { type } = cmd;
    if (process.send) {
        process.send({ type });
    }
    else {
        console.log('worker进程无法处理命令');
    }
}
exports.SEND = SEND;
//# sourceMappingURL=log.js.map