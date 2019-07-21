import { createConnection, createServer, Socket } from 'net'

//服务端
const server = createServer()
server.on('connection', (socket: Socket) => {
  socket.on('data', (data: Buffer) => {
    console.log(server)
    socket.write(data)
  })
})
server.on('error', (err) => {
  console.log(err)
})
server.listen(9999, () => {
  console.log('socket server is listening')
})

//客户端
const socket = createConnection({ port: 9999, host: '127.0.0.1' })
socket.on('connect', () => {
  socket.write('hello socket!')
})
socket.on('error', (err: Error) => {
  console.log(err)
})
socket.on('data', (data: Buffer) => {
  console.log(data.toString())
})
socket.on('end', () => {
  console.log('socket connect is closed')
})