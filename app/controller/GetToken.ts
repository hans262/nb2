import { Controller, Context, handleRedirect } from "../../src/index.js";
import { generate, KEY } from '../token.js';
import { setCookie } from '../../src/common/cookie.js';
import { USER } from "../constant.js";

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
        handleRedirect({ ctx, location: '/', code: 302, reasonPhrase: 'login success' })
      } else {
        handleRedirect({ ctx, location: '/login', code: 302, reasonPhrase: 'login failed' })
      }
    })
  }
}