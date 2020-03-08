"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../common/path");
const stdout_1 = require("../common/stdout");
let STREAM = null;
let CURRENT_DAY;
function getStream() {
    CURRENT_DAY = new Date().toLocaleDateString().replace(/\//g, '-');
    const fileName = path_1.join(path_2.LOGS_PATH, `/${CURRENT_DAY}.log`);
    return fs_1.createWriteStream(fileName, { flags: 'a' });
}
function writeLine(data) {
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
function DEBUG_TASK(massage) {
    const { type, msg, pid = process.pid } = massage;
    const date = new Date().toLocaleString();
    const mq = `[${date}] [${pid}] [${type}] -> ${msg}`;
    stdout_1.Stdout.debug(type, mq);
    writeLine(mq);
}
function DEBUG(massage) {
    process.nextTick(DEBUG_TASK, massage);
}
exports.DEBUG = DEBUG;
function SEND(cmd) {
    const { type } = cmd;
    if (process.connected) {
        process.send({ type });
    }
    else {
        console.log('worker进程无法处理命令');
    }
}
exports.SEND = SEND;
//# sourceMappingURL=logger.js.map