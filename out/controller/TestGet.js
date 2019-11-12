"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestGet {
    constructor() {
        this.PATH_NAME = '/api/get';
    }
    GET(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const { __query } = req;
        res.end(JSON.stringify(__query));
    }
}
exports.TestGet = TestGet;
//# sourceMappingURL=TestGet.js.map