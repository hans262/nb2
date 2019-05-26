const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const { ZIP_MATCH } = require('../../config/default')

function isZip(absolutePath) {
  const type = path.extname(absolutePath)
  const matched = type.match(ZIP_MATCH)//压缩范围
  return matched
}

export default function ResZip(req, res) {
  const { absolutePath } = req
  let stream = fs.createReadStream(absolutePath)

  if (isZip(absolutePath)) {
    //需要压缩
    //客户端支持的压缩类型

    //数据需要压缩，分块传输，所以无法得知数据体的真实大小
    //所有要删除Content-Length属性
    res.setHeader('Transfer-Encoding', 'chunked')
    res.removeHeader('Content-Length')

    const ZipType = req.headers['accept-encoding']
    if (ZipType.match(/\bgzip\b/)) {
      res.setHeader('Content-Encoding', 'gzip')
      stream = stream.pipe(zlib.createGzip())
    } else if (ZipType.match(/\bdeflate\b/)) {
      res.setHeader('Content-Encoding', 'deflate')
      stream = stream.pipe(zlib.createDeflate())
    }
    process.send({ type: 'INFO', pid: process.pid, msgtype: 'RES_ZIP', msg: absolutePath })
  } else {
    process.send({ type: 'INFO', pid: process.pid, msgtype: 'RES_FILE', msg: absolutePath })
  }

  res.writeHead(200, 'OK')
  stream.pipe(res)
}