"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestRand {
    constructor() {
        this.PATH_NAME = '/api/rand/*';
    }
    GET(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const { __query } = req;
        res.end(JSON.stringify(__query));
    }
}
exports.TestRand = TestRand;
//# sourceMappingURL=TestRand.js.map