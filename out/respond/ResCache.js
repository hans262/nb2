"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../modules/log");
function ResCache(req, res) {
    const { absolutePath } = req;
    log_1.LOG({ type: 'RES_CACHE', msg: absolutePath });
    res.writeHead(304, 'Not Modified');
    res.end('Not Modified');
}
exports.default = ResCache;
//# sourceMappingURL=ResCache.js.map