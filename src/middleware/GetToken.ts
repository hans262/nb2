import { ServerResponse } from 'http';
import { parse, ParsedUrlQuery } from 'querystring';
import { USER } from '../configure';
import { Middleware } from '../Interface/Middleware';
import { Req } from '../Interface/Req';
import { Session } from '../Interface/Session';
import { generate, KEY } from '../modules/Session';
import { ResRedirect } from '../respond/ResRedirect';
import { setCookie } from '../common/cookie';

export const GetToken: Middleware = function (
  req: Req, res: ServerResponse, next: Function
): void {
  const { method, __relativePath } = req
  if (method === 'POST' && __relativePath === '/getToken') {
    const chunks: Array<Buffer> = []
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })
    req.on('end', () => {
      const buffer: Buffer = Buffer.concat(chunks)
      const toQueryString: string = buffer.toString()
      const toObj: ParsedUrlQuery = parse(toQueryString)
      const { username, password } = toObj
      if (username === USER.username && password === USER.password) {
        const ses: Session = generate()
        setCookie({ res, key: KEY, value: ses.id, path: '/', expires: new Date(ses.expire), httpOnly: true })
        ResRedirect({ req, res, location: '/', code: 302, reasonPhrase: 'login success' })
      } else {
        ResRedirect({ req, res, location: '/login', code: 302, reasonPhrase: 'login failed' })
      }
    })
  } else {
    next()
  }
}