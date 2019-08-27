"use strict";
let ab = new ArrayBuffer(16);
let view = new DataView(ab);
view.setBigUint64(0, 18446744073709551615n);
console.log(ab);
let ab2 = new ArrayBuffer(10);
let u16a = new Uint8Array(ab2);
u16a.fill(50);
console.log(u16a);
debugger;
//# sourceMappingURL=ArrayBuffer.js.map