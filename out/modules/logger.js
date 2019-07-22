"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../utils/path");
let STREAM = null;
let CURRENT_DAY;
function getStream() {
    CURRENT_DAY = new Date().toLocaleDateString();
    const fileName = path_1.join(path_2.LOG_PATH, `/${CURRENT_DAY}.log`);
    return fs_1.createWriteStream(fileName, { flags: 'a' });
}
function WRITE_LINE(data) {
    if (!STREAM) {
        STREAM = getStream();
    }
    const newDay = new Date().toLocaleDateString();
    if (newDay !== CURRENT_DAY) {
        STREAM.close();
        STREAM = getStream();
    }
    STREAM.write(data + '\r\n');
}
function DEBUG(massage) {
    const { type, msg, pid = process.pid } = massage;
    const date = new Date().toLocaleString();
    const str = `[${date}] [${pid}] [${type}] -> ${msg}`;
    console.info(str);
    WRITE_LINE(str);
}
exports.DEBUG = DEBUG;
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
//# sourceMappingURL=logger.js.map