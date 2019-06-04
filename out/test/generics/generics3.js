function swap(tuple) {
    return [tuple[1], tuple[0]];
}
const result = swap([7, 'seven']);
function tests(arg) {
    return arg.length;
}
function copyFields(target, source) {
    const result = Object.assign({}, target);
    for (let key in source) {
        result[key] = source[key];
    }
    return result;
}
const A = { name: '花花', age: 18, like: '种菜' };
const B = { age: 20, like: '打篮球' };
const C = copyFields(A, B);
debugger;
//# sourceMappingURL=generics3.js.map