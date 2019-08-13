"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../common/path");
function test1() {
    const num = 800000;
    const writeStream = fs_1.createWriteStream(path_1.join(path_2.PUBLIC_PATH, 'text.txt'), {
        flags: 'a'
    });
    const start = Date.now();
    for (let i = 0; i < num; i++) {
        writeStream.write('hello world ' + i + '\r\n');
    }
    writeStream.close();
    writeStream.on('close', () => {
        const timer = Date.now() - start;
        console.log('timer: ' + timer);
    });
}
function test2() {
    const start = Date.now();
    for (let i = 0; i < 4; i++) {
        const worker = new worker_threads_1.Worker(__dirname + '/worker.js');
        worker.on('error', err => {
            console.log(err);
        });
    }
    process.on('exit', code => {
        const timer = Date.now() - start;
        console.log('timer: ' + timer);
    });
}
test2();
//# sourceMappingURL=index.js.map