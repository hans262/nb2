"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../utils/path");
function CREATE_STREAM() {
    const CURRENT_DAY = new Date().toLocaleDateString();
    const FILE_NAME = path_1.join(path_2.LOG_PATH, `/${CURRENT_DAY}.log`);
    const STREAM = fs_1.createWriteStream(FILE_NAME, {
        flags: 'a',
        encoding: 'utf8'
    });
    return STREAM;
}
exports.CREATE_STREAM = CREATE_STREAM;
const STREAM = CREATE_STREAM();
function WRITE(MSG) {
    STREAM.write(MSG);
    STREAM.write('\r\n');
}
exports.WRITE = WRITE;
WRITE('DWQDQ');
WRITE('SFSDF');
//# sourceMappingURL=write.js.map