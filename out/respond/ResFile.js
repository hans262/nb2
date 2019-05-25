"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mime_1 = require("../utils/mime");
var ResZip = require('./ResZip').ResZip;
var ResRange = require('./ResRange').ResRange;
var CACHE_MAX_AGE = REQUIRE('config/default').CACHE_MAX_AGE;
var _a = REQUIRE('src/utils/cache'), generateETag = _a.generateETag, isCache = _a.isCache;
var ResCache = require('./ResCache');
function ResFile(req, res) {
    var absolutePath = req.absolutePath, stats = req.stats;
    var size = stats.size, mtime = stats.mtime;
    //判断缓存
    if (isCache(req)) {
        return ResCache(req, res);
    }
    //文件最后修改时间
    res.setHeader('Last-Modified', mtime.toUTCString());
    //到期时间，单位秒
    var expire = (new Date(Date.now() + CACHE_MAX_AGE * 1000)).toUTCString();
    res.setHeader('Expires', expire);
    //实现缓存机制
    res.setHeader('Cache-Control', "public, max-age=" + CACHE_MAX_AGE);
    //资源关联记号
    res.setHeader('ETag', generateETag(stats));
    //mime类型
    res.setHeader('Content-Type', mime_1.mime(absolutePath) + '; charset=utf-8');
    //内容大小
    res.setHeader('Content-Length', size);
    if (req.headers['range']) {
        //范围请求
        ResRange(req, res);
    }
    else {
        //不是范围请求
        ResZip(req, res);
    }
}
exports.default = ResFile;
//# sourceMappingURL=ResFile.js.map