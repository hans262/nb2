"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fibonacci(num) {
    if (num <= 2) {
        return 1;
    }
    else {
        return fibonacci(num - 1) + fibonacci(num - 2);
    }
}
function fibonacci2(num) {
    const array = [];
    for (let i = 0; i < num; i++) {
        if (i > 1) {
            array[i] = array[i - 1] + array[i - 2];
        }
        else {
            array[i] = 1;
        }
    }
    return array[num - 1];
}
function test(num) {
    const start = Date.now();
    const ret = fibonacci(num);
    const timer = Date.now() - start;
    console.log(`fib ${num} = ${ret}`);
    console.log('timer = ' + timer + 'ms');
}
exports.test = test;
//# sourceMappingURL=fibonacci.js.map