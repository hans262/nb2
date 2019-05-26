"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../controller"));
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