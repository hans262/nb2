"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bufferSplit_1 = require("../modules/bufferSplit");
exports.default = new class UpFile {
    constructor() {
        this.PATH = '/api/upfiles';
    }
    POST(req, res) {
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });
        req.on('end', () => {
            const buffers = Buffer.concat(chunks);
            const contentType = req.headers['content-type'];
            const matched = contentType.match(/(^| )boundary=([^;]*)(;|$)/);
            const boundary = '--' + matched[2];
            const startBoundary = Buffer.from(boundary + '\r\n');
            const endBoundary = Buffer.from('\r\n' + boundary + '--\r\n');
            const temp = buffers.slice(startBoundary.byteLength, buffers.byteLength - endBoundary.byteLength);
            const boundary2 = '\r\n' + boundary + '\r\n';
            const temp2 = bufferSplit_1.bufferSplit(temp, boundary2);
            const result = [];
            for (const buf of temp2) {
                let offset = 0;
                let index = 0;
                index = buf.indexOf('\r\n', offset);
                const oneLine = buf.slice(offset, index).toString();
                offset = index + 2;
                index = buf.indexOf('\r\n', offset);
                const twoLine = buf.slice(offset, index).toString();
                offset = index + 2 + 2;
                const formData = buf.slice(offset);
                result.push({ oneLine, twoLine, formData });
            }
            console.log(result);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ sucess: true, result: '上传成功' }));
        });
    }
};
//# sourceMappingURL=UpFiles.js.map