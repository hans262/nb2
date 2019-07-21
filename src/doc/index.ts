import { createConnection, createServer } from 'net'

//服务端
const server = createServer((c) => {
  //接收数据
  c.on('end', () => {
    console.log('客户端已断开连接')
  })
  c.on('data', data => {
    console.log(data.toString())
  })
  setTimeout(() => {
    c.write('你好')
    // c.end()
  }, 2000)
})
server.on('error', (err) => {
  console.log(err)
})
server.listen(8888, () => {
  console.log('服务器已启动')
})

//客户端
const client = createConnection({ port: 8888, host: '127.0.0.1', timeout: 1000 }, () => {
  //发送数据
  client.write('world!')
})
client.on('error', err => {
  console.log(err)
})
client.on('timeout', () => {
  console.log('超时')
})
client.on('data', (data) => {
  console.log(data.toString())
  // client.end()
})
client.on('end', () => {
  console.log('与服务器断开连接')
})


/**
 * api 设计
 *
 *
 * read.createConnection(config):connect
 *
 * connect.get('name'):any
 * 
 * repot
 *
 * dispatch 模式
 */