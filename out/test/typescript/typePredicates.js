"use strict";
var TestTypePredicates;
(function (TestTypePredicates) {
    function isColor(val) {
        return val === 'Red' || val === 'Green';
    }
    function main() {
        let color = 'Red';
        if (isColor(color)) {
            color;
        }
    }
    TestTypePredicates.main = main;
})(TestTypePredicates || (TestTypePredicates = {}));
//# sourceMappingURL=typePredicates.js.map