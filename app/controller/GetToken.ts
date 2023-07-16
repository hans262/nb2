import { Controller, Context, setCookie, outRedirect, getBodyData } from "../../src/index.js";
import { generate, KEY } from '../token.js';
import { USER } from "../constant.js";

export class GetToken implements Controller {
  readonly pathname = '/getToken'
  async POST(ctx: Context) {
    const { res } = ctx
    const buffer = await getBodyData(ctx.req)
    const toQueryString = buffer.toString()
    const toObj = new URLSearchParams(toQueryString)
    const [username, password] = [toObj.get('username'), toObj.get('password')]
    if (username === USER.username && password === USER.password) {
      const token = generate()
      setCookie({ res, key: KEY, value: token.id, path: '/', expires: new Date(token.expire), httpOnly: true })
      outRedirect(ctx, { location: '/', code: 302, reasonPhrase: 'login success' })
    } else {
      outRedirect(ctx, { location: '/login', code: 302, reasonPhrase: 'login failed' })
    }
  }
}