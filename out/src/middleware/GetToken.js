"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring_1 = require("querystring");
var SESSION_1 = require("../store/SESSION");
var setCookie_1 = require("../utils/setCookie");
var ResRedirect_1 = require("../respond/ResRedirect");
var conf_1 = require("../conf");
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
            var toObj = querystring_1.parse(toString);
            var username = toObj.username, password = toObj.password;
            if (username === conf_1.USER.username && password === conf_1.USER.password) {
                var ses = SESSION_1.generate();
                setCookie_1.default(res, SESSION_1.KEY, ses.id, {
                    path: '/',
                    expires: new Date(ses.expire),
                    httpOnly: true,
                });
                ResRedirect_1.default(res, '/', 302, 'Login Success');
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
exports.default = GetToken;
//# sourceMappingURL=GetToken.js.map