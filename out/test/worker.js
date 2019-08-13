"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../common/path");
const writeStream = fs_1.createWriteStream(path_1.join(path_2.PUBLIC_PATH, 'text.txt'), { flags: 'a' });
const num = 200000;
for (let i = 0; i < num; i++) {
    writeStream.write(worker_threads_1.threadId + ' hello world ' + i + '\r\n');
}
writeStream.close();
//# sourceMappingURL=worker.js.map