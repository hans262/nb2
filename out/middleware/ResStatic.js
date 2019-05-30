"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const conf_1 = require("../conf");
const ResDir_1 = require("../respond/ResDir");
const ResIndex_1 = require("../respond/ResIndex");
const ResNotFound_1 = require("../respond/ResNotFound");
const ResVerify_1 = require("../respond/ResVerify");
exports.ResStatic = function (req, res, next) {
    const { __absolutePath } = req;
    fs_1.stat(__absolutePath, (err, stats) => {
        if (err) {
            return conf_1.REACT_APP ? ResIndex_1.ResIndex(req, res) : ResNotFound_1.ResNotFound(req, res);
        }
        req.__stats = stats;
        if (stats.isDirectory()) {
            return ResDir_1.ResDir(req, res);
        }
        if (stats.isFile()) {
            return ResVerify_1.ResVerify(req, res);
        }
    });
};
//# sourceMappingURL=ResStatic.js.map