"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestPost {
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
TestPost.PATH = '/api/post';
exports.default = TestPost;
//# sourceMappingURL=TestPost.js.map