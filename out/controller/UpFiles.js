"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bufferSplit_1 = require("../modules/bufferSplit");
exports.default = new class UpFile {
    constructor() {
        this.PATH = '/api/upfiles';
    }
    resError(res, msg) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ sucess: true, result: msg }));
    }
    POST(req, res) {
        const contentLength = req.headers['content-length'];
        if (!contentLength)
            return this.resError(res, 'content-length 不存在');
        const contentType = req.headers['content-type'];
        if (!contentType)
            return this.resError(res, 'content-type 不存在');
        const matched = contentType.match(/(^| )boundary=([^;]*)(;|$)/);
        if (!matched)
            return this.resError(res, 'boundary 不存在');
        const boundary = '--' + matched[2];
        const startBoundary = Buffer.from(boundary + '\r\n');
        const endBoundary = Buffer.from('\r\n' + boundary + '--\r\n');
        const boundary2 = '\r\n' + boundary + '\r\n';
        const boundary3 = Buffer.from(boundary + '--\r\n');
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });
        req.on('end', () => {
            const buffers = Buffer.concat(chunks);
            if (parseInt(contentLength) <= boundary3.byteLength) {
                return this.resError(res, '类容为空');
            }
            const temp = buffers.slice(startBoundary.byteLength, buffers.byteLength - endBoundary.byteLength);
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
                offset = twoLine.length ? index + 2 + 2 : index + 2;
                const formData = buf.slice(offset);
                result.push({ oneLine, twoLine, formData, contentLength: formData.byteLength });
            }
            console.log(result);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ sucess: true, result: '上传成功' }));
        });
    }
};
//# sourceMappingURL=UpFiles.js.map