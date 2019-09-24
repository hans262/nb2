"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bufferSplit_1 = require("../modules/bufferSplit");
class UpFiles {
    constructor() {
        this.PATH_NAME = '/api/upfiles';
        this.MAX_SIZE = 1024 * 1024 * 10;
    }
    resError(res, msg) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ sucess: false, result: msg }));
    }
    resOk(res, msg) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ sucess: true, result: msg }));
    }
    POST(req, res) {
        const contentLength = req.headers['content-length'];
        if (!contentLength)
            return this.resError(res, 'content-length 不存在');
        const contentLength2 = parseInt(contentLength);
        if (contentLength2 > this.MAX_SIZE)
            return this.resError(res, '超出尺寸，最大上传尺寸10M');
        const contentType = req.headers['content-type'];
        if (!contentType)
            return this.resError(res, 'content-type 不存在');
        const matched = contentType.match(/\s+boundary=([^;]+)/);
        if (!matched)
            return this.resError(res, 'boundary 不存在');
        const boundary = '--' + matched[1];
        const boundary2 = '\r\n' + boundary + '\r\n';
        const startBoundary = Buffer.from(boundary + '\r\n');
        const endBoundary = Buffer.from('\r\n' + boundary + '--\r\n');
        const endBoundary2 = Buffer.from(boundary + '--\r\n');
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });
        req.on('end', () => {
            const buffers = Buffer.concat(chunks);
            if (contentLength2 <= endBoundary2.byteLength) {
                return this.resError(res, '类容为空');
            }
            const temp = buffers.slice(startBoundary.byteLength, -endBoundary.byteLength);
            const temp2 = bufferSplit_1.bufferSplit(temp, boundary2);
            const result = [];
            for (const buf of temp2) {
                let type;
                let offset = 0, index = 0;
                index = buf.indexOf('\r\n', offset);
                const oneLine = buf.slice(offset, index).toString();
                offset = index + 2;
                index = buf.indexOf('\r\n', offset);
                const twoLine = buf.slice(offset, index).toString();
                offset = twoLine.length ? index + 2 + 2 : index + 2;
                type = twoLine.length ? 'file' : 'data';
                const formData = buf.slice(offset);
                result.push({ oneLine, type, twoLine, formData, byteLength: formData.byteLength });
            }
            console.log(result);
            this.resOk(res, '上传成功');
        });
    }
}
exports.UpFiles = UpFiles;
//# sourceMappingURL=UpFiles.js.map