"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const path_1 = require("path");
const conf_1 = require("../conf");
const setHeader_1 = __importDefault(require("../utils/setHeader"));
const log_1 = require("../modules/log");
function Mount(req, res, next) {
    const { pathname, query } = url_1.parse(req.url, true);
    //相对路径
    req.relativePath = decodeURI(pathname);
    //绝对路径
    req.absolutePath = decodeURI(path_1.join(conf_1.ROOT, req.relativePath));
    //查询字符串
    req.query = query;
    //常用header
    setHeader_1.default(res);
    log_1.LOG({ type: 'REQUEST', msg: req.absolutePath });
    next();
}
exports.default = Mount;
//# sourceMappingURL=Mount.js.map