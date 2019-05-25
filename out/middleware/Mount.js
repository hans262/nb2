"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var conf = require('../../config/default');
var setHeader = require('../utils/setHeader');
var ROOT = conf.ROOT;
function Mount(req, res, next) {
    var urlObj = url.parse(req.url, true);
    //相对路径
    req.relativePath = decodeURI(urlObj.pathname);
    //绝对路径
    req.absolutePath = decodeURI(path_1.join(ROOT, req.relativePath));
    //查询字符串
    req.query = urlObj.query;
    //常用header
    setHeader(res);
    process.send({ type: 'INFO', pid: process.pid, msgtype: 'REQUEST', msg: req.absolutePath });
    next();
}
module.exports = Mount;
//# sourceMappingURL=Mount.js.map