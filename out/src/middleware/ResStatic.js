"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var ResNotFound_1 = require("../respond/ResNotFound");
var ResDir_1 = require("../respond/ResDir");
var ResFile_1 = require("../respond/ResFile");
function ResStatic(req, res, next) {
    var absolutePath = req.absolutePath;
    fs_1.stat(absolutePath, function (err, stats) {
        if (err) {
            return ResNotFound_1.default(req, res);
        }
        req.stats = stats;
        if (stats.isDirectory()) {
            return ResDir_1.default(req, res);
        }
        if (stats.isFile()) {
            return ResFile_1.default(req, res);
        }
    });
}
exports.default = ResStatic;
//# sourceMappingURL=ResStatic.js.map