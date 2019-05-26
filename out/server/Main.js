"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MIDDLEWARE_1 = require("../store/MIDDLEWARE");
function HANDLER(req, res) {
    let i = 0;
    function next() {
        let middleware = MIDDLEWARE_1.MIDDLEWARE[i++];
        if (!middleware)
            return;
        middleware(req, res, next);
    }
    next();
}
exports.HANDLER = HANDLER;
//# sourceMappingURL=Main.js.map