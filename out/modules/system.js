"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function system(cmd) {
    child_process_1.exec(cmd, (err, stdout, stderr) => {
        if (err)
            return console.log(err);
        console.log(stderr);
        console.log(stdout);
    });
}
exports.system = system;
//# sourceMappingURL=system.js.map