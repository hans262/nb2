"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LOG(massage) {
    const { type, msg, pid } = massage;
    const nowTime = new Date().toLocaleString();
    console.info(`[${type}] pid: ${pid} date: ${nowTime} -> ${msg}`);
}
exports.LOG = LOG;
//# sourceMappingURL=log.js.map