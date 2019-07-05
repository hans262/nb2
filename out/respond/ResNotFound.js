"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../modules/log");
function ResNotFound(req, res) {
    const { __absolutePath, __relativePath } = req;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(404, 'Not Found');
    res.end(`
  	<h1>Not Found</h1>
  	<p>The requested URL ${__relativePath} was not found on this server.</p>
  `);
    log_1.LOG({ type: 'RES_404', msg: __absolutePath });
}
exports.ResNotFound = ResNotFound;
//# sourceMappingURL=ResNotFound.js.map