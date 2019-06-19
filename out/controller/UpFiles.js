"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new class UpFile {
    constructor() {
        this.PATH = '/api/upfiles';
    }
    getBoundary(req) {
        const contentType = req.headers['content-type'];
        return contentType ? contentType.split('boundary=')[1] : null;
    }
    POST(req, res) {
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });
        req.on('end', () => {
            const buffers = Buffer.concat(chunks);
            console.log(buffers.toString());
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ sucess: true, result: '上传成功' }));
        });
    }
};
//# sourceMappingURL=UpFiles.js.map