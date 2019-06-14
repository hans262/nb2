"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResRedirect_1 = require("../respond/ResRedirect");
const Session_1 = require("../modules/Session");
const cookie_1 = require("../utils/cookie");
exports.CheckLogin = function (req, res, next) {
    if (check(req, res)) {
        next();
    }
    else {
        ResRedirect_1.ResRedirect({ res, location: '/login', code: 302, reasonPhrase: 'temporarily moved' });
    }
};
function check(req, res) {
    const id = cookie_1.getCookie(req, Session_1.KEY);
    if (!id)
        return false;
    const ses = Session_1.select(id);
    if (!ses) {
        cookie_1.setCookie({
            res,
            key: Session_1.KEY,
            value: 'delete',
            expires: new Date(),
            httpOnly: true
        });
        return false;
    }
    if (ses.expire < Date.now()) {
        Session_1.remove(id);
        cookie_1.setCookie({
            res,
            key: Session_1.KEY,
            value: 'delete',
            expires: new Date(),
            httpOnly: true
        });
        return false;
    }
    Session_1.reset(id);
    return true;
}
//# sourceMappingURL=CheckLogin.js.map