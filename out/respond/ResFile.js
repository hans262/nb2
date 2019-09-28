"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const logger_1 = require("../modules/logger");
function ResFile(req, res) {
    const { __absolutePath, __startTime } = req;
    const stream = fs_1.createReadStream(__absolutePath);
    res.writeHead(200, 'Responed file');
    stream.pipe(res);
    logger_1.DEBUG({
        type: 'RES_FILE',
        msg: __absolutePath + ' +' + (Date.now() - __startTime) + 'ms'
    });
}
exports.ResFile = ResFile;
//# sourceMappingURL=ResFile.js.map