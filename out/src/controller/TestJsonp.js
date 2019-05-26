var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var TestJsonp = /** @class */ (function () {
    function TestJsonp() {
    }
    TestJsonp.prototype.GET = function (req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        var query = req.query;
        var callback = query.callback, data = __rest(query, ["callback"]);
        res.end(callback + "(" + JSON.stringify(data) + ")");
    };
    TestJsonp.PATH = '/api/jsonp';
    return TestJsonp;
}());
module.exports = TestJsonp;
//# sourceMappingURL=TestJsonp.js.map