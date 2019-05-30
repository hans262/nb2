"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../modules/log");
function ResRedirect(redirect) {
    const { res, location, code, reasonPhrase } = redirect;
    log_1.LOG({ type: 'REDIRECT', msg: location });
    res.setHeader('Location', location);
    res.writeHead(code, reasonPhrase);
    res.end();
}
exports.ResRedirect = ResRedirect;
//# sourceMappingURL=ResRedirect.js.map