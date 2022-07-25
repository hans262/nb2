import { Controller } from "../Interface/Controller.js";
import { Context } from "../Interface/Context.js";
import { parse, ParsedUrlQuery } from 'node:querystring';
import { USER } from '../configure/index.js';
import { Session } from '../Interface/Session.js';
import { generate, KEY } from '../modules/Session.js';
import { ResRedirect } from '../respond/ResRedirect.js';
import { setCookie } from '../common/cookie.js';

export class GetToken implements Controller {
  readonly PATH_NAME: string = '/getToken'
  POST(ctx: Context) {
    const { req, res } = ctx
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
        ResRedirect({ ctx, location: '/', code: 302, reasonPhrase: 'login success' })
      } else {
        ResRedirect({ ctx, location: '/login', code: 302, reasonPhrase: 'login failed' })
      }
    })
  }
}