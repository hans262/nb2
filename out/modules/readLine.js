"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../common/path");
function cli() {
    const rl = readline_1.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>> '
    });
    rl.prompt();
    rl.on('line', (line) => {
        console.log(line);
        rl.prompt();
    });
    rl.on('close', () => {
        console.log('good bye!');
        process.exit(0);
    });
}
cli();
function readLine() {
    const rl = readline_1.createInterface({
        input: fs_1.createReadStream(path_1.join(path_2.PUBLIC_PATH, 'ajax.js')),
        crlfDelay: Infinity
    });
    rl.on('line', (line) => {
        console.log(line);
    });
}
//# sourceMappingURL=readLine.js.map