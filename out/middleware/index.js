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
useMiddleware(Mount_1.Mount);
useMiddleware(Login_1.Login);
useMiddleware(GetToken_1.GetToken);
conf_1.LOGIN && useMiddleware(CheckLogin_1.CheckLogin);
useMiddleware(CheckController_1.CheckController);
useMiddleware(ResStatic_1.ResStatic);
exports.default = MIDDLEWARE;
//# sourceMappingURL=index.js.map