// @restart 重启
var Restart = /** @class */ (function () {
    function Restart() {
    }
    Restart.prototype.GET = function (req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end("\u670D\u52A1\u5668\u5C06\u572810\u540E\uFF0C\u5E73\u6ED1\u91CD\u542F\uFF0C\u4E0D\u5F71\u54CD\u4F7F\u7528\u4F53\u9A8C");
        process.send({ type: 'RE_START' });
    };
    Restart.PATH = '/api/restart';
    return Restart;
}());
module.exports = Restart;
//# sourceMappingURL=Restart.js.map