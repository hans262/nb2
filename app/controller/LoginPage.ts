import { Controller } from "../../src/ainterface/Controller.js";
import { Context } from "../../src/ainterface/Context.js";

export class LoginPage implements Controller {
  readonly PATH_NAME: string = '/login'
  GET(ctx: Context) {
    const { res } = ctx
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.writeHead(200, 'OK')

    res.end(`
      <form action="/getToken" method="post">
        Username: <input type="text" name="username">
        Password: <input type="password" name="password">
        <input type="submit">
      </form>
    `)
  }
}