"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../utils/path");
function LOG(massage) {
    const { type, msg, pid = process.pid } = massage;
    const date = new Date().toLocaleString();
    const str = `[${date}] [${type}] pid: ${pid} -> ${msg}`;
    console.info(str);
    WRITE_LINE(str);
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
function WRITE_LINE(data) {
    const currentDay = new Date().toLocaleDateString();
    const fileName = path_1.join(path_2.LOG_PATH, `/${currentDay}.log`);
    data += '\r\n';
    fs_1.writeFileSync(fileName, data, {
        flag: 'a'
    });
}
exports.WRITE_LINE = WRITE_LINE;
//# sourceMappingURL=log.js.map