import { createServer, Socket } from 'net'
import { SOCKET_SERVER_PORT } from '../conf';

//服务端
const server = createServer()
server.on('connection', (socket: Socket) => {
  socket.on('data', (data: Buffer) => {
    socket.write(data)
  })
})

server.on('error', (err: Error) => {
  console.log(err)
})

server.listen(SOCKET_SERVER_PORT, () => {
  console.log('socket server is listening on port -> ' + SOCKET_SERVER_PORT)
})

process.on('uncaughtException', err =>{
  console.log(err)
})