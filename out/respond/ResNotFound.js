"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ResNotFound(req, res) {
    const { absolutePath } = req;
    process.send({ type: 'INFO', pid: process.pid, msgtype: '404', msg: absolutePath });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(404, 'Not Found');
    res.end(`
		<h1>Not Found</h1>
		<p>The requested URL ${req.relativePath} was not found on this server.</p>
	`);
}
exports.default = ResNotFound;
//# sourceMappingURL=ResNotFound.js.map