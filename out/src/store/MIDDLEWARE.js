"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conf_1 = require("../conf");
exports.MIDDLEWARE = [];
function useMiddleware(middleware) {
    exports.MIDDLEWARE.push(middleware);
}
useMiddleware(require('../middleware/Mount'));
useMiddleware(require('../middleware/Login'));
useMiddleware(require('../middleware/GetToken'));
conf_1.LOGIN && useMiddleware(require('../middleware/CheckLogin'));
useMiddleware(require('../middleware/CheckController'));
useMiddleware(require('../middleware/ResStatic'));
//# sourceMappingURL=MIDDLEWARE.js.map