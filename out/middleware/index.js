"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = require("../conf");
const Mount_1 = __importDefault(require("./Mount"));
const Login_1 = __importDefault(require("./Login"));
const GetToken_1 = __importDefault(require("./GetToken"));
const CheckLogin_1 = __importDefault(require("./CheckLogin"));
const CheckController_1 = __importDefault(require("./CheckController"));
const ResStatic_1 = __importDefault(require("./ResStatic"));
const MIDDLEWARE = [];
function useMiddleware(middleware) {
    MIDDLEWARE.push(middleware);
}
useMiddleware(Mount_1.default);
useMiddleware(Login_1.default);
useMiddleware(GetToken_1.default);
conf_1.LOGIN && useMiddleware(CheckLogin_1.default);
useMiddleware(CheckController_1.default);
useMiddleware(ResStatic_1.default);
exports.default = MIDDLEWARE;
//# sourceMappingURL=index.js.map