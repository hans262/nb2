"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const url_1 = require("url");
const conf_1 = require("../conf");
const logger_1 = require("../modules/logger");
const setHeader_1 = require("../utils/setHeader");
exports.Mount = function (req, res, next) {
    const { url = '/' } = req;
    const { pathname = '/', query } = url_1.parse(url, true);
    req.__relativePath = decodeURI(pathname);
    req.__absolutePath = decodeURI(path_1.join(conf_1.ROOT, req.__relativePath));
    req.__query = query;
    setHeader_1.setHeader(res);
    logger_1.DEBUG({ type: 'REQUEST', msg: req.__absolutePath });
    next();
};
//# sourceMappingURL=Mount.js.map