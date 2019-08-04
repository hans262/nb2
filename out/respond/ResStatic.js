"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const configure_1 = require("../configure");
const ResDir_1 = require("./ResDir");
const ResIndex_1 = require("./ResIndex");
const ResNotFound_1 = require("./ResNotFound");
const ResVerify_1 = require("./ResVerify");
function ResStatic(req, res) {
    const { __absolutePath } = req;
    fs_1.stat(__absolutePath, (err, stats) => {
        if (err) {
            return configure_1.REACT_APP ? ResIndex_1.ResIndex(req, res) : ResNotFound_1.ResNotFound(req, res);
        }
        req.__stats = stats;
        if (stats.isDirectory()) {
            return ResDir_1.ResDir(req, res);
        }
        if (stats.isFile()) {
            return ResVerify_1.ResVerify(req, res);
        }
    });
}
exports.ResStatic = ResStatic;
//# sourceMappingURL=ResStatic.js.map