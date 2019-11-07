"use strict";
var TestAtomics;
(function (TestAtomics) {
    let sab2 = new SharedArrayBuffer(20);
    let vi = new Uint8Array(sab2);
    console.log(Atomics);
    Atomics.store(vi, 0, 255);
    console.log(vi);
    console.log(Atomics.load(vi, 0));
    debugger;
})(TestAtomics || (TestAtomics = {}));
//# sourceMappingURL=Atomics.js.map