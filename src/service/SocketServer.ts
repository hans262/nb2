import { createServer, Socket } from 'node:net'

//当前已连接的
let sockets: Array<Socket> = []
//服务
const server = createServer()
server.on('connection', (socket: Socket) => {
  sockets.push(socket)
  socket.on('data', (data: Buffer) => {
    socket.write(data)
  })
})

server.on('error', (err: Error) => {
  console.log(err)
})

server.listen(9999, () => {
  console.log('socket server is listening on port -> ' + 9999)
})

process.on('uncaughtException', err => {
  console.log(err)
  //清理掉已经被销毁连接
  sockets = sockets.filter(s => !s.destroyed && s.readable && s.writable)
})
