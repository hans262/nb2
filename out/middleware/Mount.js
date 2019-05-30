"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const url_1 = require("url");
const conf_1 = require("../conf");
const log_1 = require("../modules/log");
const setHeader_1 = require("../utils/setHeader");
exports.Mount = function (req, res, next) {
    const { pathname, query } = url_1.parse(req.url, true);
    req.__relativePath = decodeURI(pathname);
    req.__absolutePath = decodeURI(path_1.join(conf_1.ROOT, req.__relativePath));
    req.__query = query;
    setHeader_1.default(res);
    log_1.LOG({ type: 'REQUEST', msg: req.__absolutePath });
    next();
};
//# sourceMappingURL=Mount.js.map