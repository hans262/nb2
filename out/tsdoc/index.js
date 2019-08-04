"use strict";
function test1(num) {
    if (num <= 2) {
        return 1;
    }
    else {
        return test1(num - 1) + test1(num - 2);
    }
}
function test2(num) {
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
const start = Date.now();
const ret = test1(40);
const timer = Date.now() - start;
console.log(ret);
console.log(timer);
//# sourceMappingURL=index.js.map