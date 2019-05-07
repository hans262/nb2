const fs = require('fs')
const path = require('path')

class DownLoad {
  constructor() {
    this.path = '/api/download'
    this.method = 'POST'
  }
  handler(req, res) {
    res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename=ajax.js')
    const pro = __dirname.split('src')[0]
    const file = path.join(pro, 'public/ajax.js')
    const ReadStream = fs.createReadStream(file, 'binary')
    ReadStream.pipe(res)
  }
}
module.exports = new DownLoad()


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