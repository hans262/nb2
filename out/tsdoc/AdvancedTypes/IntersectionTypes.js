"use strict";
function mixins(first, second) {
    let result = {};
    for (let key in first) {
        result[key] = first[key];
    }
    for (let key in second) {
        result[key] = second[key];
    }
    return result;
}
const first = {
    name: 'huahua',
    loacation: 'china'
};
const second = {
    name: 'goudan',
    age: 18
};
const myObj = mixins(first, second);
console.log(myObj.name);
//# sourceMappingURL=IntersectionTypes.js.map