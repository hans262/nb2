"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ResDir_1 = require("../respond/ResDir");
const ResFile_1 = require("../respond/ResFile");
const ResNotFound_1 = require("../respond/ResNotFound");
function ResStatic(req, res, next) {
    const { absolutePath } = req;
    fs_1.stat(absolutePath, (err, stats) => {
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