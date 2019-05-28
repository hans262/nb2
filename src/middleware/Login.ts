import { Req } from "../Interface/Req";
import { ServerResponse } from "http";

export default function login(req: Req, res: ServerResponse, next: Function): void {
  const { method, relativePath } = req
  if (method === 'GET' && relativePath === '/login') {
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