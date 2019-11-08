"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fibonacci = (num) => num <= 2 ? 1 : fibonacci(num - 1) + fibonacci(num - 2);
function test(num) {
    console.time('fib');
    const ret = fibonacci(num);
    console.timeEnd('fib');
}
exports.test = test;
test(45);
//# sourceMappingURL=fibonacci.js.map