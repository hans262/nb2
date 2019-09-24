"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repl_1 = require("repl");
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
//# sourceMappingURL=repl.js.map