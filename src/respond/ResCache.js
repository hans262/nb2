function ResCache(req, res) {
  process.send({
    type: 'INFO',
    pid: process.pid,
    msgtype: 'RES_CHCHE',
    msg: req.absolutePath
  })
  res.writeHead(304, 'Not Modified')
  res.end('Not Modified')
}
module.exports = ResCache