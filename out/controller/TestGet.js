var TestGet = /** @class */ (function () {
    function TestGet() {
    }
    TestGet.prototype.GET = function (req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        var query = req.query;
        res.end(JSON.stringify(query));
    };
    TestGet.PATH = '/api/get';
    return TestGet;
}());
module.exports = TestGet;
//# sourceMappingURL=TestGet.js.map