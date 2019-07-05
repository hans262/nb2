"use strict";
function isNumber(x) {
    return typeof x === 'number';
}
console.log(isNumber(123));
function isDate(obj) {
    return obj instanceof Date;
}
console.log(isDate(new Date()));
//# sourceMappingURL=TypeGuards.js.map