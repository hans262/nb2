import { Controller, Context, outRedirect } from "../../src/index.js";
import { generate, KEY } from '../token.js';
import { USER } from "../constant.js";

export class GetToken implements Controller {
  readonly pathname = '/getToken'
  async POST(ctx: Context) {
    const buffer = await ctx.getBodyData()
    const toQueryString = buffer.toString()
    const toObj = new URLSearchParams(toQueryString)
    const [username, password] = [toObj.get('username'), toObj.get('password')]
    if (username === USER.username && password === USER.password) {
      const token = generate()
      ctx.setCookie(KEY, token.id, { path: '/', expires: new Date(token.expire), httpOnly: true })
      outRedirect(ctx, { location: '/', code: 302, reason: 'login success' })
    } else {
      outRedirect(ctx, { location: '/login', code: 302, reason: 'login failed' })
    }
  }
}