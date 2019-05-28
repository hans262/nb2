"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = require("querystring");
const conf_1 = require("../conf");
const ResRedirect_1 = require("../respond/ResRedirect");
const SESSION_1 = require("../store/SESSION");
const setCookie_1 = require("../utils/setCookie");
function GetToken(req, res, next) {
    const { method, relativePath } = req;
    if (method === 'POST' && relativePath === '/getToken') {
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });
        req.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const toQueryString = buffer.toString();
            const toObj = querystring_1.parse(toQueryString);
            const { username, password } = toObj;
            if (username === conf_1.USER.username && password === conf_1.USER.password) {
                const ses = SESSION_1.generate();
                setCookie_1.default({
                    res,
                    key: SESSION_1.KEY,
                    value: ses.id,
                    path: '/',
                    expires: new Date(ses.expire),
                    httpOnly: true
                });
                ResRedirect_1.default({ res, location: '/', code: 302, reasonPhrase: 'login success' });
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