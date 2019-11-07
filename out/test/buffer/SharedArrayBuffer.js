"use strict";
var TestSharedArrayBuffer;
(function (TestSharedArrayBuffer) {
    let sab = new SharedArrayBuffer(64);
    let u8v = new Uint8Array(sab);
    u8v.fill(255);
    console.log(u8v);
    debugger;
})(TestSharedArrayBuffer || (TestSharedArrayBuffer = {}));
//# sourceMappingURL=SharedArrayBuffer.js.map