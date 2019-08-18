import { createServer } from "http"

createServer((req, res) => {
  // console.log(req.headers.cookie)
  // res.setHeader('Set-Cookie', ['name=huahua', 'age=18'])
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
  // req.pipe(res)
  res.end('代理服务器的响应类容')
}).listen(7777)