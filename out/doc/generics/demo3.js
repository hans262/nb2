"use strict";
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
const result = swap([7, 'seven']);
function tests(arg) {
    return arg.length;
}
function copyFields(target, source) {
    const result = { ...target };
    for (let key in source) {
        result[key] = source[key];
    }
    return result;
}
const a = { name: '花花', age: 18, like: '种菜' };
const b = { age: 20, like: '打篮球' };
const c = copyFields(a, b);
debugger;
//# sourceMappingURL=demo3.js.map