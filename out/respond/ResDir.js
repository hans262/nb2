"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const conf_1 = require("../conf");
const ResRedirect_1 = __importDefault(require("./ResRedirect"));
function ResDir(req, res) {
    const { absolutePath, relativePath } = req;
    const INDEX_PATH = path_1.join(absolutePath, conf_1.INDEX_PAGE); //index路径
    if (fs_1.existsSync(INDEX_PATH)) {
        //重定向一下
        const location = path_1.join(relativePath, conf_1.INDEX_PAGE);
        ResRedirect_1.default(res, { location, code: 302, reasonPhrase: 'index exists' });
    }
    else {
        const files = fs_1.readdirSync(absolutePath);
        let content = `<h1>Index of ${req.relativePath}</h1>`;
        files.forEach(file => {
            let href = path_1.join(relativePath, file);
            let small = '';
            try {
                const stats = fs_1.statSync(path_1.join(absolutePath, file));
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
                small += `<small style="color:red">无权系统路径</small>`;
            }
            content += `<p><a href="${href}">${file}</a>${small}</p>`;
        });
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.writeHead(200, 'Access Directory');
        res.end(content);
        process.send({ type: 'INFO', pid: process.pid, msgtype: 'RES_DIR', msg: absolutePath });
    }
}
exports.default = ResDir;
//# sourceMappingURL=ResDir.js.map