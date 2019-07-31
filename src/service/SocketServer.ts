import { createServer, Socket } from 'net'
import { SOCKET_SERVER_PORT } from '../conf';

function RUN(): void {
  //当前已连接的
  let sockets: Array<Socket> = []
  //服务
  const server = createServer()
  server.on('connection', (socket: Socket) => {
    sockets.push(socket)
    socket.on('data', (data: Buffer) => {
      socket.write(data)
    })
    console.log(sockets)
  })

  server.on('error', (err: Error) => {
    console.log(err)
  })

  server.listen(SOCKET_SERVER_PORT, () => {
    console.log('socket server is listening on port -> ' + SOCKET_SERVER_PORT)
  })

  process.on('uncaughtException', err => {
    console.log(err)
    //清理掉已经被销毁连接
    sockets = sockets.filter(s => !s.destroyed && s.readable && s.writable)
  })
}
RUN()