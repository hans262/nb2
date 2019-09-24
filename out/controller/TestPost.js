"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestPost {
    constructor() {
        this.PATH_NAME = '/api/post';
    }
    POST(req, res) {
        res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
        res.writeHead(200, 'OK');
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });
        req.on('end', () => {
            const buffer = Buffer.concat(chunks);
            res.end(buffer);
        });
    }
}
exports.TestPost = TestPost;
//# sourceMappingURL=TestPost.js.map