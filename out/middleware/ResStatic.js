"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ResNotFound_1 = __importDefault(require("../respond/ResNotFound"));
const ResDir_1 = __importDefault(require("../respond/ResDir"));
const ResFile_1 = __importDefault(require("../respond/ResFile"));
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