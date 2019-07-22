"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("../modules/request");
;
(async () => {
    try {
        const ret = await request_1.it({
            hostname: '127.0.0.1',
            port: 5000,
            path: '/api/post',
            method: 'POST',
            body: 'hello world'
        });
        console.log(ret);
        const { response } = ret;
        console.log(response.toString());
    }
    catch (err) {
        console.log(err);
    }
})();
//# sourceMappingURL=index.js.map