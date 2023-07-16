import { createConnection } from 'node:net'
import { SocketServer } from '../src/index.js'

//启动服务端
new SocketServer()

//创建连接
const socket = createConnection({
  port: 9999, host: '127.0.0.1',
})

socket.on('connect', () => {
  socket.write('我要销毁了')
  socket.destroy()
})

socket.on('data', d => {
  console.log(d.toString())
})

socket.on('error', err => {
  console.log(err)
  socket.destroy()
})