"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("../middleware"));
function HANDLER(req, res) {
    let i = 0;
    function next() {
        let middleware = middleware_1.default[i++];
        if (!middleware)
            return;
        middleware(req, res, next);
    }
    next();
}
exports.HANDLER = HANDLER;
//# sourceMappingURL=Main.js.map