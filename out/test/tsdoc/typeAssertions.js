"use strict";
var TestTypeAssertions;
(function (TestTypeAssertions) {
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
    function getName(student) {
        return student.name;
    }
    const x = { text: 'hello' };
    let y = 25;
})(TestTypeAssertions || (TestTypeAssertions = {}));
//# sourceMappingURL=typeAssertions.js.map