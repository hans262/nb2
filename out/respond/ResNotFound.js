"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../modules/logger");
function ResNotFound(req, res) {
    const { __absolutePath, __relativePath, __startTime } = req;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(404, 'Not Found');
    res.end(`
  	<h1>Not Found</h1>
  	<p>The requested URL ${__relativePath} was not found on this server.</p>
  `);
    logger_1.DEBUG({
        type: 'RES_404',
        msg: __absolutePath + ' +' + (Date.now() - __startTime) + 'ms'
    });
}
exports.ResNotFound = ResNotFound;
//# sourceMappingURL=ResNotFound.js.map