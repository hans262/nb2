var fs = require('fs');
var ResNotFound = require('../respond/ResNotFound');
var ResDir = require('../respond/ResDir');
var ResFile = require('../respond/ResFile');
function ResStatic(req, res, next) {
    var absolutePath = req.absolutePath;
    fs.stat(absolutePath, function (err, stats) {
        if (err) {
            return ResNotFound(req, res);
        }
        req.stats = stats;
        if (stats.isDirectory()) {
            return ResDir(req, res);
        }
        if (stats.isFile()) {
            return ResFile(req, res);
        }
    });
}
module.exports = ResStatic;
//# sourceMappingURL=ResStatic.js.map