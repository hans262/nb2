"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const conf_1 = require("../conf");
const log_1 = require("../modules/log");
const ResStatic_1 = require("./ResStatic");
function ResDir(req, res) {
    const { __absolutePath, __relativePath } = req;
    const dirents = fs_1.readdirSync(__absolutePath, {
        withFileTypes: true
    });
    if (dirents.find(d => d.name === conf_1.INDEX_PAGE)) {
        req.__absolutePath = path_1.join(__absolutePath, conf_1.INDEX_PAGE);
        return ResStatic_1.ResStatic(req, res);
    }
    let content = `<h1>Index of ${__relativePath}</h1>`;
    dirents.forEach(file => {
        let { name } = file;
        let href = path_1.join(__relativePath, name);
        if (file.isDirectory()) {
            href += '/';
            name += '/';
        }
        content += `<p><a href="${href}">${name}</a></p>`;
    });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200, 'Access Directory');
    res.end(content);
    log_1.LOG({ type: 'RES_DIR', msg: __absolutePath });
}
exports.ResDir = ResDir;
//# sourceMappingURL=ResDir.js.map