let someValue = 2555;
let strLength = someValue.length;
function createArray(length, value) {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
const result = createArray(3, 'x2');
console.log(result);
//# sourceMappingURL=index.2.js.map