function createArray(length, value) {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
const result = createArray(5, 'x'); // ['x', 'x', 'x']
console.log(result);
//# sourceMappingURL=index.js.map