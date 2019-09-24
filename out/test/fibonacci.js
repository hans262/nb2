"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fibonacci = (num) => {
    if (num <= 2) {
        return 1;
    }
    else {
        return fibonacci(num - 1) + fibonacci(num - 2);
    }
};
function test(num) {
    const start = Date.now();
    const ret = fibonacci(num);
    const timer = Date.now() - start;
    console.log(`fib ${num} = ${ret}`);
    console.log('timer = ' + timer + 'ms');
}
exports.test = test;
//# sourceMappingURL=fibonacci.js.map