"use strict";
let ab = new ArrayBuffer(16);
let view = new DataView(ab);
view.setBigUint64(0, 18446744073709551615n);
console.log(ab);
let ab2 = new ArrayBuffer(10);
let u16a = new Uint8Array(ab2);
u16a.fill(50);
console.log(u16a);
const enCoder = new TextEncoder();
const uint8 = enCoder.encode('hello 你好!');
const deCoder = new TextDecoder('utf-8');
const ret = deCoder.decode(uint8);
console.log(ret);
//# sourceMappingURL=ArrayBuffer.js.map