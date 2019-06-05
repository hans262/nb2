function getLength(something) {
    if (something.length) {
        return something.length;
    }
    else {
        return something.toString().length;
    }
}
const len = getLength(123);
const len2 = getLength('hello');
const len3 = getLength(true);
debugger;
const x = { text: 'hello' };
let y = 25;
//# sourceMappingURL=assertions.js.map