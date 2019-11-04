"use strict";
var TestUnionTypes;
(function (TestUnionTypes) {
    function getLength(arg) {
        return arg.length;
    }
    function main() {
        console.log(getLength('hello'));
        console.log(getLength([1, 2, 3]));
    }
    TestUnionTypes.main = main;
})(TestUnionTypes || (TestUnionTypes = {}));
TestUnionTypes.main();
//# sourceMappingURL=unionTypes.js.map