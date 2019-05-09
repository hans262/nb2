function ResCache(req, res) {
  const { absolutePath } = req
  process.send({ type: 'INFO', pid: process.pid, msgtype: 'RES_CHCHE', msg: absolutePath })
  res.writeHead(304, 'Not Modified')
  res.end('Not Modified')
}
module.exports = ResCache