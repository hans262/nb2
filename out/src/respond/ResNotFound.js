"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ResNotFound(req, res) {
    var absolutePath = req.absolutePath;
    process.send({ type: 'INFO', pid: process.pid, msgtype: '404', msg: absolutePath });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(404, 'Not Found');
    res.end("\n\t\t<h1>Not Found</h1>\n\t\t<p>The requested URL " + req.relativePath + " was not found on this server.</p>\n\t");
}
exports.default = ResNotFound;
//# sourceMappingURL=ResNotFound.js.map