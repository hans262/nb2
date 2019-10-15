"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const fs_1 = require("fs");
function readLine(path) {
    const rl = readline_1.createInterface({
        input: fs_1.createReadStream(path),
        crlfDelay: Infinity
    });
    rl.on('line', (line) => {
        console.log(line);
    });
    return rl;
}
exports.readLine = readLine;
//# sourceMappingURL=readLine.js.map