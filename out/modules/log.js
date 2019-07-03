"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../utils/path");
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
let STREAM = null;
let CURRENT_DAY;
function createStream() {
    CURRENT_DAY = new Date().toLocaleDateString();
    const fileName = path_1.join(path_2.LOG_PATH, `/${CURRENT_DAY}.log`);
    return fs_1.createWriteStream(fileName, { flags: 'a' });
}
function WRITE_LINE(data) {
    if (!STREAM) {
        STREAM = createStream();
    }
    const newDay = new Date().toLocaleDateString();
    if (newDay !== CURRENT_DAY) {
        STREAM.close();
        STREAM = createStream();
    }
    STREAM.write(data + '\r\n');
}
exports.WRITE_LINE = WRITE_LINE;
function LOG(massage) {
    const { type, msg, pid = process.pid } = massage;
    const date = new Date().toLocaleString();
    const str = `[${date}] [${pid}] [${type}] -> ${msg}`;
    console.info(str);
    WRITE_LINE(str);
}
exports.LOG = LOG;
//# sourceMappingURL=log.js.map