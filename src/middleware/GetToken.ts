import { parse } from 'querystring'
import { generate, KEY } from '../store/SESSION'
import setCookie from '../utils/setCookie'
import ResRedirect from '../respond/ResRedirect'
import { USER } from '../conf'

export default function GetToken(req, res, next) {
  const { method, relativePath } = req
  if (method === 'POST' && relativePath === '/getToken') {
    let chunks = []
    req.on('data', chunk => {
      chunks.push(chunk)
    })
    req.on('end', () => {
      const buffer = Buffer.concat(chunks)
      const toString = buffer.toString()
      const toObj = parse(toString)
      const { username, password } = toObj
      if (username === USER.username && password === USER.password) {
        const ses = generate()
        setCookie(res, KEY, ses.id, {
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