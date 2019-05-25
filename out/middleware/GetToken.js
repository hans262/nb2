var querystring = require('querystring');
var _a = require('../store/SESSION'), generate = _a.generate, KEY = _a.KEY;
var setCoolie = require('../utils/setCookie');
var ResRedirect = require('../respond/ResRedirect');
var conf = require('../../config/default');
var USER = conf.USER;
function GetToken(req, res, next) {
    var method = req.method, relativePath = req.relativePath;
    if (method === 'POST' && relativePath === '/getToken') {
        var chunks_1 = [];
        req.on('data', function (chunk) {
            chunks_1.push(chunk);
        });
        req.on('end', function () {
            var buffer = Buffer.concat(chunks_1);
            var toString = buffer.toString();
            var toObj = querystring.parse(toString);
            var username = toObj.username, password = toObj.password;
            if (username === USER.username && password === USER.password) {
                var ses = generate();
                setCoolie(res, KEY, ses.id, {
                    path: '/',
                    expires: new Date(ses.expire),
                    httpOnly: true,
                });
                ResRedirect(res, '/', 302, 'Login Success');
            }
            else {
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.writeHead(200, 'OK');
                res.end('登录失败');
            }
        });
    }
    else {
        next();
    }
}
module.exports = GetToken;
//# sourceMappingURL=GetToken.js.map