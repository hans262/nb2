import { Controller, Context } from "../../src/index.js";

export class LoginPage implements Controller {
  readonly pathname = '/login'
  GET(ctx: Context) {
    const { res } = ctx

    const body = `
      <form action="/getToken" method="post">
        Username: <input type="text" name="username">
        Password: <input type="password" name="password">
        <input type="submit">
      </form>
    `

    res.writeHead(200, 'OK', {
      'Content-Type': ctx.getContentType('html'),
      'Content-Length': Buffer.byteLength(body)
    }).end(body)
  }
}