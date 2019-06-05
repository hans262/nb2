import { ServerResponse } from "http";
import { Middleware } from "../Interface/Middleware";
import { Req } from "../Interface/Req";

export const LoginPage: Middleware = function (req: Req, res: ServerResponse, next: Function): void {
  const { method, __relativePath } = req
  if (method === 'GET' && __relativePath === '/login') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.writeHead(200, 'OK')
    res.end(`
      <form action="/getToken" method="post">
        Username: <input type="text" name="username">
        Password: <input type="password" name="password">
        <input type="submit">
      </form>
    `)
  } else {
    next()
  }
}