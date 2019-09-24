"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResStatic_1 = require("../respond/ResStatic");
const path_1 = require("../common/path");
exports.ResFavicon = function (req, res, next) {
    const { __relativePath, method } = req;
    if (method === 'GET' && __relativePath === '/favicon.ico') {
        req.__absolutePath = path_1.FAVION_PATH;
        ResStatic_1.ResStatic(req, res);
    }
    else {
        next();
    }
};
//# sourceMappingURL=ResFavicon.js.map