"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const conf_1 = require("../conf");
const log_1 = require("../modules/log");
const ResRedirect_1 = require("./ResRedirect");
function ResDir(req, res) {
    const { __absolutePath, __relativePath } = req;
    const files = fs_1.readdirSync(__absolutePath);
    if (files.includes(conf_1.INDEX_PAGE)) {
        const location = path_1.join(__relativePath, conf_1.INDEX_PAGE);
        return ResRedirect_1.default({ res, location, code: 302, reasonPhrase: 'index exists' });
    }
    let content = `<h1>Index of ${__relativePath}</h1>`;
    files.forEach(file => {
        let href = path_1.join(__relativePath, file);
        let small = '';
        try {
            const stats = fs_1.statSync(path_1.join(__absolutePath, file));
            if (stats.isDirectory()) {
                href += '/';
                file += '/';
            }
        }
        catch (err) {
            log_1.LOG({ type: 'ERROR', msg: err.message });
            small += `<small style="color:red">无权系统路径</small>`;
        }
        content += `<p><a href="${href}">${file}</a>${small}</p>`;
    });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200, 'Access Directory');
    res.end(content);
    log_1.LOG({ type: 'RES_DIR', msg: __absolutePath });
}
exports.default = ResDir;
//# sourceMappingURL=ResDir.js.map