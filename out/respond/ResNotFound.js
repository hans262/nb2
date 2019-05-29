"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../modules/log");
function ResNotFound(req, res) {
    const { __absolutePath, __relativePath } = req;
    log_1.LOG({ type: '404', msg: __absolutePath });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(404, 'Not Found');
    res.end(`
		<h1>Not Found</h1>
		<p>The requested URL ${__relativePath} was not found on this server.</p>
	`);
}
exports.default = ResNotFound;
//# sourceMappingURL=ResNotFound.js.map