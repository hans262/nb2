const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const { ZIP_MATCH } = require('../../config/default')

function isZip(absolutePath) {
  const type = path.extname(absolutePath)
  const matched = type.match(ZIP_MATCH)//压缩范围
  return matched
}

function ResZip(req, res) {
  const { absolutePath } = req
  let stream = fs.createReadStream(absolutePath)

  if (isZip(absolutePath)) {
    //需要压缩
    //客户端支持的压缩类型
    const ZipTypes = req.headers['accept-encoding']
    if (ZipTypes.match(/\bgzip\b/)) {
      res.setHeader('Content-Encoding', 'gzip')
      res.removeHeader('Content-Length')
      stream = stream.pipe(zlib.createGzip())
    } else if (ZipTypes.match(/\bdeflate\b/)) {
      res.setHeader('Content-Encoding', 'deflate')
      res.removeHeader('Content-Length')
      stream = stream.pipe(zlib.createDeflate())
    }
    process.send({ type: 'INFO', pid: process.pid, msgtype: 'RES_ZIP', msg: absolutePath })
  } else {
    process.send({ type: 'INFO', pid: process.pid, msgtype: 'RES_FILE', msg: absolutePath })
  }
  
  res.writeHead(200, 'OK')
  stream.pipe(res)
}

module.exports = {
  ResZip
}