"use strict";
class Test {
    constructor(size) {
        this.size = size;
    }
    getSize() {
        return this.size;
    }
    say() { }
}
const test = new Test('XL');
console.log(Object.getOwnPropertyNames(Test.prototype));
console.log(test.hasOwnProperty('size'));
debugger;
//# sourceMappingURL=test.js.map