"use strict";
let F2 = new Float64Array(20);
F2.fill(25.64455);
let ab = new ArrayBuffer(24);
let view = new DataView(ab);
view.setBigUint64(0, 18446744073709551615n);
console.log(ab);
debugger;
//# sourceMappingURL=arraybuffer.js.map