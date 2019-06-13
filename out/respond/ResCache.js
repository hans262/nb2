"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../modules/log");
function ResCache(req, res) {
    const { __absolutePath } = req;
    res.writeHead(304, 'Not Modified');
    res.end('Not Modified');
    log_1.LOG({ type: 'RES_CACHE', msg: __absolutePath });
}
exports.ResCache = ResCache;
//# sourceMappingURL=ResCache.js.map