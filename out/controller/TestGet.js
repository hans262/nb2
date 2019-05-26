"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestGet {
    GET(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const { query } = req;
        res.end(JSON.stringify(query));
    }
}
TestGet.PATH = '/api/get';
exports.default = TestGet;
//# sourceMappingURL=TestGet.js.map