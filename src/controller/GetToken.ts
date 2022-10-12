import { Controller } from "../interface/Controller.js";
import { Context } from "../interface/Context.js";
import { USER } from '../configure/index.js';
import { generate, KEY } from '../modules/Token.js';
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
      const toObj = new URLSearchParams(toQueryString)
      const [username, password] = [toObj.get('username'), toObj.get('password')]
      if (username === USER.username && password === USER.password) {
        const token = generate()
        setCookie({ res, key: KEY, value: token.id, path: '/', expires: new Date(token.expire), httpOnly: true })
        ResRedirect({ ctx, location: '/', code: 302, reasonPhrase: 'login success' })
      } else {
        ResRedirect({ ctx, location: '/login', code: 302, reasonPhrase: 'login failed' })
      }
    })
  }
}