"use strict";
var TestGenerics;
(function (TestGenerics) {
    const K1 = { type: ['1', '2', '3'] };
    const createArray = (length, value) => {
        const result = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    };
    const stringArrray = createArray(3, 'hello');
    const numberArray = createArray(3, 123);
    class CreateArray {
        constructor(length, value) {
            this.result = [];
            for (let i = 0; i < length; i++) {
                this.result.push(value);
            }
        }
        getResult() {
            return this.result;
        }
    }
    const strArrary = new CreateArray(3, 'hello').getResult();
    const numArrary = new CreateArray(3, 123).getResult();
    function swap(tuple) {
        return [tuple[1], tuple[0]];
    }
    const result = swap([7, 'seven']);
})(TestGenerics || (TestGenerics = {}));
//# sourceMappingURL=generics.js.map