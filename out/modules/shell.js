"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
child_process_1.exec('node -v', (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(stdout);
    console.log(stderr);
});
const stdout = child_process_1.execSync('node -v');
console.log(stdout.toString());
//# sourceMappingURL=shell.js.map