"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var path_1 = require("path");
var conf = require('../../config/default');
var setHeader = require('../utils/setHeader');
var ROOT = conf.ROOT;
function Mount(req, res, next) {
    var _a = url_1.parse(req.url, true), pathname = _a.pathname, query = _a.query;
    //相对路径
    req.relativePath = decodeURI(pathname);
    //绝对路径
    req.absolutePath = decodeURI(path_1.join(ROOT, req.relativePath));
    //查询字符串
    req.query = query;
    //常用header
    setHeader(res);
    process.send({ type: 'INFO', pid: process.pid, msgtype: 'REQUEST', msg: req.absolutePath });
    next();
}
exports.default = Mount;
//# sourceMappingURL=Mount.js.map