"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configure_1 = require("../configure");
const CheckController_1 = require("./CheckController");
const CheckLogin_1 = require("./CheckLogin");
const GetToken_1 = require("./GetToken");
const Later_1 = require("./Later");
const LoginPage_1 = require("./LoginPage");
const Mount_1 = require("./Mount");
const ResFavicon_1 = require("./ResFavicon");
const ProxyServer_1 = require("./ProxyServer");
const combineMiddleware = (...middleware) => middleware.filter((m) => m !== false);
const MIDDLEWARE = combineMiddleware(Mount_1.Mount, ResFavicon_1.ResFavicon, ProxyServer_1.ProxyServer, configure_1.LOGIN && LoginPage_1.LoginPage, configure_1.LOGIN && GetToken_1.GetToken, configure_1.LOGIN && CheckLogin_1.CheckLogin, CheckController_1.CheckController, Later_1.Later);
exports.default = MIDDLEWARE;
//# sourceMappingURL=index.js.map