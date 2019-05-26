"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = require("../conf");
const Mount_1 = __importDefault(require("../middleware/Mount"));
const Login_1 = __importDefault(require("../middleware/Login"));
const GetToken_1 = __importDefault(require("../middleware/GetToken"));
const CheckLogin_1 = __importDefault(require("../middleware/CheckLogin"));
const CheckController_1 = __importDefault(require("../middleware/CheckController"));
const M = [];
function useMiddleware(middleware) {
    M.push(middleware);
}
useMiddleware(Mount_1.default);
useMiddleware(Login_1.default);
useMiddleware(GetToken_1.default);
conf_1.LOGIN && useMiddleware(CheckLogin_1.default);
useMiddleware(CheckController_1.default);
// useMiddleware(await import('../middleware/ResStatic'))
useMiddleware((req, res, next) => {
    res.end('ss');
});
exports.MIDDLEWARE = M;
//# sourceMappingURL=MIDDLEWARE.js.map