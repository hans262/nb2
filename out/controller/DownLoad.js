"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const path_2 = require("../common/path");
class DownLoad {
    constructor() {
        this.PATH_NAME = '/api/download';
    }
    POST(_, res) {
        const file = 'ajax.js';
        const filename = path_1.join(path_2.PUBLIC_PATH, file);
        res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename=${file}`);
        const reader = fs_1.createReadStream(filename);
        reader.pipe(res);
    }
}
exports.DownLoad = DownLoad;
//# sourceMappingURL=DownLoad.js.map