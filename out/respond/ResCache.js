"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../modules/logger");
function ResCache(req, res) {
    const { __absolutePath, __startTime } = req;
    res.writeHead(304, 'Not Modified');
    res.end('Not Modified');
    logger_1.DEBUG({
        type: 'RES_CACHE',
        msg: __absolutePath + ' +' + (Date.now() - __startTime) + 'ms'
    });
}
exports.ResCache = ResCache;
//# sourceMappingURL=ResCache.js.map