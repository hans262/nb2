"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test;
(function (Test) {
    function isColor(val) {
        return val === 'Red' || val === 'Green';
    }
    function main() {
        let color = 'Red';
        if (isColor(color)) {
            color;
        }
    }
    Test.main = main;
})(Test = exports.Test || (exports.Test = {}));
//# sourceMappingURL=TypePredicates.js.map