"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getCookie_1 = require("../utils/getCookie");
var setCookie_1 = require("../utils/setCookie");
var ResRedirect_1 = require("../respond/ResRedirect");
var SESSION_1 = require("../store/SESSION");
function CheckLogin(req, res, next) {
    if (check(req, res)) {
        next();
    }
    else {
        ResRedirect_1.default(res, '/login', 302, 'Temporarily Moved');
    }
}
exports.default = CheckLogin;
function check(req, res) {
    var id = getCookie_1.default(req, SESSION_1.KEY);
    if (!id)
        return false; //id不存在
    var ses = SESSION_1.select(id); //-查询
    if (!ses) {
        //session不存在
        setCookie_1.default(res, SESSION_1.KEY, 'delete', {
            path: '/',
            expires: new Date(),
            httpOnly: true
        });
        return false;
    }
    if (ses.expire < Date.now()) {
        //超时
        SESSION_1.remove(id); //-删除
        setCookie_1.default(res, SESSION_1.KEY, 'delete', {
            path: '/',
            expires: new Date(),
            httpOnly: true
        });
        return false; //转到登陆
    }
    SESSION_1.reset(id); //-重置
    return true;
}
//# sourceMappingURL=CheckLogin.js.map