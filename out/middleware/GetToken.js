"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = require("querystring");
const conf_1 = require("../conf");
const Session_1 = require("../modules/Session");
const ResRedirect_1 = require("../respond/ResRedirect");
const cookie_1 = require("../utils/cookie");
exports.GetToken = function (req, res, next) {
    const { method, __relativePath } = req;
    if (method === 'POST' && __relativePath === '/getToken') {
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
                const ses = Session_1.generate();
                cookie_1.setCookie({ res, key: Session_1.KEY, value: ses.id, path: '/', expires: new Date(ses.expire), httpOnly: true });
                ResRedirect_1.ResRedirect({ req, res, location: '/', code: 302, reasonPhrase: 'login success' });
            }
            else {
                ResRedirect_1.ResRedirect({ req, res, location: '/login', code: 302, reasonPhrase: 'login failed' });
            }
        });
    }
    else {
        next();
    }
};
//# sourceMappingURL=GetToken.js.map