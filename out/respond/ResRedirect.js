"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../modules/logger");
function ResRedirect(redirect) {
    const { res, location, code, reasonPhrase } = redirect;
    res.setHeader('Location', location);
    res.writeHead(code, reasonPhrase);
    res.end();
    logger_1.DEBUG({ type: 'REDIRECT', msg: location });
}
exports.ResRedirect = ResRedirect;
//# sourceMappingURL=ResRedirect.js.map