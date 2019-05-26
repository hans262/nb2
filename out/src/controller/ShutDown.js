// @restart 关机
var ShutDown = /** @class */ (function () {
    function ShutDown() {
    }
    ShutDown.prototype.GET = function (req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end("\u670D\u52A1\u5668\u5C06\u572810s\u540E\u5173\u95ED\uFF01");
        process.send({ type: 'SHUT_DOWN' });
    };
    ShutDown.PATH = '/api/shutdown';
    return ShutDown;
}());
module.exports = ShutDown;
//# sourceMappingURL=ShutDown.js.map