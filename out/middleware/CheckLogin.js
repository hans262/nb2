var getCookie = require('../utils/getCookie');
var setCookie = require('../utils/setCookie');
var ResRedirect = require('../respond/ResRedirect');
var _a = require('../store/SESSION'), KEY = _a.KEY, select = _a.select, remove = _a.remove, reset = _a.reset;
function CheckLogin(req, res, next) {
    if (check(req, res)) {
        next();
    }
    else {
        ResRedirect(res, '/login', 302, 'Temporarily Moved');
    }
}
function check(req, res) {
    var id = getCookie(req, KEY);
    if (!id)
        return false; //id不存在
    var ses = select(id); //-查询
    if (!ses) {
        //session不存在
        setCookie(res, KEY, 'delete', {
            path: '/',
            expires: new Date(),
            httpOnly: true
        });
        return false;
    }
    if (ses.expire < Date.now()) {
        //超时
        remove(id); //-删除
        setCookie(res, KEY, 'delete', {
            path: '/',
            expires: new Date(),
            httpOnly: true
        });
        return false; //转到登陆
    }
    reset(id); //-重置
    return true;
}
module.exports = CheckLogin;
//# sourceMappingURL=CheckLogin.js.map