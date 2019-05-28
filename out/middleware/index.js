"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = require("../conf");
const CheckController_1 = require("./CheckController");
const CheckLogin_1 = require("./CheckLogin");
const GetToken_1 = require("./GetToken");
const Login_1 = require("./Login");
const Mount_1 = require("./Mount");
const ResStatic_1 = require("./ResStatic");
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