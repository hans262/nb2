"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var path_2 = require("../utils/path");
var DownLoad = /** @class */ (function () {
    function DownLoad() {
    }
    DownLoad.prototype.POST = function (req, res) {
        res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename=ajax.js');
        var file = path_1.join(path_2.PUBLIC_PATH, 'ajax.js');
        var ReadStream = fs_1.createReadStream(file, 'binary');
        ReadStream.pipe(res);
    };
    DownLoad.PATH = '/api/download';
    return DownLoad;
}());
exports.default = DownLoad;
/*
  前端代码
  const res = await ajax('/api/download', {
    type: 'post',
    responseType: 'arraybuffer'
  })
  console.log(res)
  const blob = new Blob([res], { type: 'application/octet-stream', endings: 'native' })
  // 兼容不同浏览器的URL对象
  const url = window.URL || window.webkitURL || window.moxURL
  // 创建下载链接
  const downloadHref = url.createObjectURL(blob)
  // 创建a标签并为其添加属性
  let downloadLink = document.createElement('a')
  downloadLink.href = downloadHref
  downloadLink.download = 'ajax.js'
  // 触发点击事件执行下载
  downloadLink.click()
*/ 
//# sourceMappingURL=DownLoad.js.map