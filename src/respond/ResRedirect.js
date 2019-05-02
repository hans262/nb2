function ResRedirect(res, location, code, reasonPhrase) {
  process.send({
    type: 'INFO',
    pid: process.pid,
    msgtype: 'REDIRECT',
    msg: location
  })
  res.setHeader('Location', location)
  res.writeHead(code, reasonPhrase)
  res.end()
}

module.exports = ResRedirect

/**
 * 301永久
 * 302临时性
 */