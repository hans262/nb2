"use strict";
var TestTypeGuards;
(function (TestTypeGuards) {
    let mok;
    if (typeof mok === 'number') {
        mok;
    }
    if (mok instanceof Date) {
        mok.toLocaleDateString();
    }
})(TestTypeGuards || (TestTypeGuards = {}));
//# sourceMappingURL=typeGuards.js.map