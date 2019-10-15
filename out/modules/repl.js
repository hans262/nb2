"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repl_1 = require("repl");
const readline_1 = require("readline");
function createCmd() {
    const repl = repl_1.start({ prompt: '$ ' });
    repl.defineCommand('sayhello', {
        help: '打招呼',
        action: (name) => {
            repl.clearBufferedCommand();
            console.log(`你好, ${name}!`);
            repl.displayPrompt();
        }
    });
    repl.defineCommand('saybye', {
        help: '退出',
        action: () => {
            console.log('good bye!');
            repl.close();
        }
    });
    return repl;
}
exports.createCmd = createCmd;
function createLli() {
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
exports.createLli = createLli;
//# sourceMappingURL=repl.js.map