"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dns_1 = require("dns");
dns_1.lookup('www.baidu.com', (err, address, family) => {
    console.log(err);
    console.log(address);
    console.log(family);
});
console.log(dns_1.getServers());
debugger;
//# sourceMappingURL=index.js.map