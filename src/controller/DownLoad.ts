import { createReadStream } from 'fs'
import { join } from 'path'
import { PUBLIC_PATH } from '../utils/path'

export default class DownLoad {
  static PATH='/api/download'
  POST(req, res) {
    res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename=ajax.js')
    const file = join(PUBLIC_PATH, 'ajax.js')
    const ReadStream = createReadStream(file, 'binary')
    ReadStream.pipe(res)
  }
}


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