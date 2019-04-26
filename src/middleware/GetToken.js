const querystring = require('querystring')
const session = require('../server/session')
const setCoolie = require('../utils/setCookie')

function GetToken(req, res, next) {
  const { method, relativePath } = req
  if (method === 'POST' && relativePath === '/getToken') {
    let chunks = []
    req.on('data', chunk => {
      chunks.push(chunk)
    })
    req.on('end', () => {
      const buffer = Buffer.concat(chunks)
      const toString = buffer.toString()
      const toObj = querystring.parse(toString)
      const { username, password } = toObj

      if (username === 'root' && password === '123456') {
        const ses = session.generate()
        setCoolie(res, session.KEY, ses.id, {
          path: '/',
          expires: new Date(ses.expire),
          httpOnly: true,
        })
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.writeHead(200, 'OK')
        res.end('OK')
      } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.writeHead(200, 'OK')
        res.end(`FALSE`)
      }
    })
  } else {
    next()
  }
}
module.exports = GetToken