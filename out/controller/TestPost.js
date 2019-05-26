"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class TestPost {
    POST(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
            res.writeHead(200, 'OK');
            let chunks = [];
            req.on('data', chunk => {
                chunks.push(chunk);
            });
            req.on('end', () => {
                const buffer = Buffer.concat(chunks);
                res.end(buffer);
            });
        });
    }
}
TestPost.PATH = '/api/post';
exports.default = TestPost;
//# sourceMappingURL=TestPost.js.map