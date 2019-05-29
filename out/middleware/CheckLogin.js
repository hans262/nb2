"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResRedirect_1 = require("../respond/ResRedirect");
const SESSION_1 = require("../store/SESSION");
const cookie_1 = require("../utils/cookie");
function CheckLogin(req, res, next) {
    if (check(req, res)) {
        next();
    }
    else {
        ResRedirect_1.default({ res, location: '/login', code: 302, reasonPhrase: 'temporarily moved' });
    }
}
exports.default = CheckLogin;
function check(req, res) {
    const id = cookie_1.getCookie(req, SESSION_1.KEY);
    if (!id)
        return false; //id不存在
    const ses = SESSION_1.select(id); //-查询
    if (!ses) {
        //session不存在
        cookie_1.setCookie({
            res,
            key: SESSION_1.KEY,
            value: 'delete',
            expires: new Date(),
            httpOnly: true
        });
        return false;
    }
    if (ses.expire < Date.now()) {
        //超时
        SESSION_1.remove(id); //-删除
        cookie_1.setCookie({
            res,
            key: SESSION_1.KEY,
            value: 'delete',
            expires: new Date(),
            httpOnly: true
        });
        return false; //转到登陆
    }
    SESSION_1.reset(id); //-重置
    return true;
}
//# sourceMappingURL=CheckLogin.js.map