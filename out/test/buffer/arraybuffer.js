"use strict";
var TestArrayBuffer;
(function (TestArrayBuffer) {
    let ab = new ArrayBuffer(16);
    let view = new DataView(ab);
    view.setBigUint64(0, 18446744073709551615n);
    console.log(view.getBigUint64(0));
    let ab2 = new ArrayBuffer(10);
    let u8a = new Uint8Array(ab2);
    u8a.fill(50);
    console.log(u8a);
    const enCoder = new TextEncoder();
    const uint8 = enCoder.encode('hello 你好!');
    const deCoder = new TextDecoder('utf-8');
    const ret = deCoder.decode(uint8);
    console.log(ret);
    debugger;
})(TestArrayBuffer || (TestArrayBuffer = {}));
//# sourceMappingURL=arraybuffer.js.map