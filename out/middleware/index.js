"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = require("../conf");
const CheckController_1 = require("./CheckController");
const CheckLogin_1 = require("./CheckLogin");
const GetToken_1 = require("./GetToken");
const Later_1 = require("./Later");
const LoginPage_1 = require("./LoginPage");
const Mount_1 = require("./Mount");
const ResFavicon_1 = require("./ResFavicon");
const MIDDLEWARE = [];
function useMiddleware(middleware) {
    MIDDLEWARE.push(middleware);
}
useMiddleware(Mount_1.Mount);
useMiddleware(ResFavicon_1.ResFavicon);
conf_1.LOGIN && useMiddleware(LoginPage_1.LoginPage);
conf_1.LOGIN && useMiddleware(GetToken_1.GetToken);
conf_1.LOGIN && useMiddleware(CheckLogin_1.CheckLogin);
useMiddleware(CheckController_1.CheckController);
useMiddleware(Later_1.Later);
exports.default = MIDDLEWARE;
//# sourceMappingURL=index.js.map