"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const log_1 = require("../modules/log");
function ResRange(req, res) {
    const { __absolutePath, __stats } = req;
    const { size } = __stats;
    const range = parseRange(req.headers['range'], size);
    if (range) {
        const { start, end } = range;
        res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`);
        res.setHeader('Content-Length', (end - start + 1));
        const stream = fs_1.createReadStream(__absolutePath, { start, end });
        res.writeHead(206, 'Partial content');
        stream.pipe(res);
        log_1.LOG({ type: 'RES_RANGE', msg: __absolutePath });
    }
    else {
        res.removeHeader('Content-Length');
        res.setHeader('Content-Range', `bytes=*/${size}`);
        res.writeHead(416, 'Out of range');
        res.end();
        log_1.LOG({ type: '416', msg: __absolutePath });
    }
}
exports.ResRange = ResRange;
function parseRange(range, size) {
    const r0 = range.match(/^bytes=(\d+)-(\d+)$/);
    if (!r0)
        return null;
    const start = parseInt(r0[1]);
    const end = parseInt(r0[2]);
    if (start > end)
        return null;
    if (end >= size)
        return null;
    const r = {
        start, end
    };
    return r;
}
//# sourceMappingURL=ResRange.js.map