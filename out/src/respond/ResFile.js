"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mime_1 = require("../utils/mime");
var ResZip_1 = require("./ResZip");
var ResRange_1 = require("./ResRange");
var conf_1 = require("../conf");
var cache_1 = require("../utils/cache");
var ResCache_1 = require("./ResCache");
function ResFile(req, res) {
    var absolutePath = req.absolutePath, stats = req.stats;
    var size = stats.size, mtime = stats.mtime;
    //判断缓存
    if (cache_1.isCache(req)) {
        return ResCache_1.default(req, res);
    }
    //文件最后修改时间
    res.setHeader('Last-Modified', mtime.toUTCString());
    //到期时间，单位秒
    var expire = (new Date(Date.now() + conf_1.CACHE_MAX_AGE * 1000)).toUTCString();
    res.setHeader('Expires', expire);
    //实现缓存机制
    res.setHeader('Cache-Control', "public, max-age=" + conf_1.CACHE_MAX_AGE);
    //资源关联记号
    res.setHeader('ETag', cache_1.generateETag(stats));
    //mime类型
    res.setHeader('Content-Type', mime_1.mime(absolutePath) + '; charset=utf-8');
    //内容大小
    res.setHeader('Content-Length', size);
    if (req.headers['range']) {
        //范围请求
        ResRange_1.default(req, res);
    }
    else {
        //不是范围请求
        ResZip_1.default(req, res);
    }
}
exports.default = ResFile;
//# sourceMappingURL=ResFile.js.map