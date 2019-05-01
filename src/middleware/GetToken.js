const querystring = require('querystring')
const { generate, KEY } = require('../store/SESSION')
const setCoolie = require('../utils/setCookie')
const ResRedirect = require('../respond/ResRedirect')

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
        const ses = generate()
        setCoolie(res, KEY, ses.id, {
          path: '/',
          expires: new Date(ses.expire),
          httpOnly: true,
        })
        ResRedirect(res, '/', 302, 'Login Success')
      } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.writeHead(200, 'OK')
        res.end('登录失败')
      }
    })
  } else {
    next()
  }
}
module.exports = GetToken