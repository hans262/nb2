"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ResDir_1 = require("../respond/ResDir");
const ResVerify_1 = require("../respond/ResVerify");
const ResNotFound_1 = require("../respond/ResNotFound");
function ResStatic(req, res, next) {
    const { __absolutePath } = req;
    fs_1.stat(__absolutePath, (err, stats) => {
        if (err) {
            return ResNotFound_1.default(req, res);
        }
        req.__stats = stats;
        if (stats.isDirectory()) {
            return ResDir_1.default(req, res);
        }
        if (stats.isFile()) {
            return ResVerify_1.default(req, res);
        }
    });
}
exports.default = ResStatic;
//# sourceMappingURL=ResStatic.js.map