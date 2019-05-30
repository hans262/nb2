"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const conf_1 = require("../conf");
const ResVerify_1 = require("./ResVerify");
function ResIndex(req, res) {
    req.__absolutePath = path_1.join(conf_1.ROOT, conf_1.INDEX_PAGE);
    req.__stats = fs_1.statSync(req.__absolutePath);
    return ResVerify_1.ResVerify(req, res);
}
exports.ResIndex = ResIndex;
//# sourceMappingURL=ResIndex.js.map