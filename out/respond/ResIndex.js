"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const conf_1 = require("../conf");
const ResVerify_1 = require("./ResVerify");
const ResNotFound_1 = require("./ResNotFound");
function ResIndex(req, res) {
    const INDEX_PATH = path_1.join(conf_1.ROOT, conf_1.INDEX_PAGE);
    fs_1.stat(INDEX_PATH, (err, stats) => {
        if (stats && stats.isFile()) {
            req.__stats = fs_1.statSync(INDEX_PATH);
            req.__absolutePath = INDEX_PATH;
            return ResVerify_1.ResVerify(req, res);
        }
        return ResNotFound_1.ResNotFound(req, res);
    });
}
exports.ResIndex = ResIndex;
//# sourceMappingURL=ResIndex.js.map