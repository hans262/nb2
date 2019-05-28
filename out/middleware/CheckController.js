"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../controller");
function CheckController(req, res, next) {
    const { method, relativePath } = req;
    const Con = controller_1.default.find(v => v.PATH === relativePath);
    if (!Con || !Con.prototype[method])
        return next();
    const r0 = new Con();
    r0[method](req, res);
}
exports.default = CheckController;
//# sourceMappingURL=CheckController.js.map