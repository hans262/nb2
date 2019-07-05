"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const log_1 = require("../modules/log");
function ResFile(req, res) {
    const { __absolutePath } = req;
    const stream = fs_1.createReadStream(__absolutePath);
    res.writeHead(200, 'Responed file');
    stream.pipe(res);
    log_1.LOG({ type: 'RES_FILE', msg: __absolutePath });
}
exports.ResFile = ResFile;
//# sourceMappingURL=ResFile.js.map