const fs = require('fs')
function parseRange(range, size) {
  //目前只处理第一个分段
  //必须格式: bytes=0-10
  //比如说 length=10, 你只能读取0-9的范围
  //读取包含起始位置和结束位置字节
  //当前字节，start===end

  const r0 = range.match(/^bytes=(\d+)-(\d+)$/)
  if (!r0) return null

  const start = parseInt(r0[1])
  const end = parseInt(r0[2])

  if (start > end) return null
  if (end >= size) return null

  return { start, end }
}

function ResRange(req, res) {
  const { absolutePath } = req
  const { size } = req.stats
  //拿到范围，解析范围
  let range = parseRange(req.headers['range'], size)
  //判断范围是否存在
  if (range) {
    const {start, end}=range
    res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
    res.setHeader('Content-Length', (end - start+1))
    const stream = fs.createReadStream(absolutePath, {start,end})

    res.writeHead(206, 'Partial Content')
    stream.pipe(res)

  }else{
    res.removeHeader('Content-Length')
    res.setHeader('Content-Range', `bytes=*/${size}`)
    res.writeHead(416, 'Request Range Not Satisfiable')
    res.end()
  }
}

module.exports = {
  ResRange
}