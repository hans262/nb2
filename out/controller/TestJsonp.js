"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
class TestJsonp {
    GET(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const { query } = req;
        const { callback } = query, data = __rest(query, ["callback"]);
        res.end(`${callback}(${JSON.stringify(data)})`);
    }
}
TestJsonp.PATH = '/api/jsonp';
exports.default = TestJsonp;
//# sourceMappingURL=TestJsonp.js.map