"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const url_1 = require("url");
const configure_1 = require("../configure");
const publicHeader_1 = require("../common/publicHeader");
exports.Mount = function (req, res, next) {
    const { url = '/' } = req;
    const { pathname = '/', query } = url_1.parse(url, true);
    req.__relativePath = decodeURI(pathname);
    req.__absolutePath = decodeURI(path_1.join(configure_1.ROOT, req.__relativePath));
    req.__query = query;
    publicHeader_1.publicHeader(res);
    next();
};
//# sourceMappingURL=Mount.js.map