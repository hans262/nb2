"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("../utils/path");
const read = fs_1.readFileSync(path_1.PACKAGE_PATH);
const packageConf = JSON.parse(read.toString());
exports.default = packageConf;
//# sourceMappingURL=packageConf.js.map