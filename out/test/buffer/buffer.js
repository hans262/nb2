"use strict";
const buf = Buffer.alloc(128);
let MaxBigUInt64 = 2n ** 64n - 1n;
buf.writeBigUInt64BE(MaxBigUInt64);
buf.writeDoubleBE(25.4568552, 8);
console.log(buf.readDoubleBE(8));
let MaxBigInt64 = 2n ** 63n - 1n;
let MinBigInt64 = -(2n ** 63n);
buf.writeBigInt64BE(MinBigInt64, 16);
console.log(buf.readBigInt64BE(16));
console.log(buf);
//# sourceMappingURL=Buffer.js.map