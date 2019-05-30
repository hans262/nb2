"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ResDir_1 = require("../respond/ResDir");
const ResNotFound_1 = require("../respond/ResNotFound");
const ResVerify_1 = require("../respond/ResVerify");
exports.ResStatic = function (req, res, next) {
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
};
//# sourceMappingURL=ResStatic.js.map