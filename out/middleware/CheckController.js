"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CONTROLLER_1 = require("../store/CONTROLLER");
function CheckController(req, res, next) {
    const { method, relativePath } = req;
    const Con = CONTROLLER_1.CONTROLLER.find(v => v.PATH === relativePath);
    if (!Con || !Con.prototype[method])
        return next();
    const r0 = new Con();
    r0[method](req, res);
}
exports.default = CheckController;
//# sourceMappingURL=CheckController.js.map