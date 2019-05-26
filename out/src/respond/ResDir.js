"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var conf_1 = require("../conf");
var ResRedirect_1 = require("./ResRedirect");
function ResDir(req, res) {
    var absolutePath = req.absolutePath, relativePath = req.relativePath;
    var INDEX_PATH = path_1.join(absolutePath, conf_1.INDEX_PAGE); //index路径
    if (fs_1.existsSync(INDEX_PATH)) {
        //重定向一下
        var location_1 = path_1.join(relativePath, conf_1.INDEX_PAGE);
        ResRedirect_1.default(res, location_1, 302, 'Index exists');
    }
    else {
        var files = fs_1.readdirSync(absolutePath);
        var content_1 = "<h1>Index of " + req.relativePath + "</h1>";
        files.forEach(function (file) {
            var href = path_1.join(relativePath, file);
            var small = '';
            try {
                var stats = fs_1.statSync(path_1.join(absolutePath, file));
                if (stats.isDirectory()) {
                    href += '/';
                    file += '/';
                }
            }
            catch (err) {
                process.send({
                    type: 'INFO',
                    pid: process.pid,
                    msgtype: 'ERROR',
                    msg: err.message
                });
                small += "<small style=\"color:red\">\u65E0\u6743\u7CFB\u7EDF\u8DEF\u5F84</small>";
            }
            content_1 += "<p><a href=\"" + href + "\">" + file + "</a>" + small + "</p>";
        });
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.writeHead(200, 'Access Directory');
        res.end(content_1);
        process.send({ type: 'INFO', pid: process.pid, msgtype: 'RES_DIR', msg: absolutePath });
    }
}
exports.default = ResDir;
//# sourceMappingURL=ResDir.js.map