import { createHash } from 'node:crypto';
import { createServer, Socket } from 'node:net';
import { decodeDataFrame, encodeDataFrame } from './common/frameParse.js';
import { bufferSplit } from './common/bufferSplit.js';

const server = createServer()
server.on('connection', socket => socket.once('data', socket_once))
server.listen(8888)

const sockets = new Map<number, Socket>()

function socket_once(this: Socket, data: Buffer) {
  const headers = parse_headers(data)
  if (headers.Upgrade !== 'websocket') {
    return this.end()
  }
  if (headers["Sec-WebSocket-Version"] !== '13') {
    return this.end()
  }
  const KEY = headers['Sec-WebSocket-Key']
  if (!KEY) return this.end()
  this.write(
    accept_headers(compute_accept(KEY))
  )
  this.on('data', on_socket_data)

  const socket_id = Date.now() + Math.random()
  sockets.set(socket_id, this)
  console.log(sockets)

  this.on('end', () => {
    sockets.delete(socket_id)
    this.destroy()
  })
}

function on_socket_data(this: Socket, data: Buffer) {
  const frame = decodeDataFrame(data)
  console.log(frame)
  // console.log(frame.PayloadData.slice(-10).toString())

  // 客户端发起了断开连接
  if (frame.Opcode === 8) {
    return this.end()
  }
  // ping请求
  if (frame.Opcode === 9) {
    return this.write(Buffer.concat([
      Buffer.from([0b10001010, frame.PayloadLength]),
      frame.PayloadData
    ]))
  }
  //群发
  if (frame.Opcode === 1) {
    sockets.forEach(s => s.write(
      encodeDataFrame(frame)
    ))
  }
}

function compute_accept(KEY: string): string {
  const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
  // 创建一个签名算法为sha1的哈希对象
  const hash = createHash('sha1')
  hash.update(KEY + GUID)
  return hash.digest('base64')
}

function accept_headers(accept: string): string {
  const headers = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    'Sec-Websocket-Accept: ' + accept + '\r\n\r\n'
  ]
  return headers.join('\r\n')
}

function parse_headers(data: Buffer): SocketHeader {
  console.log(data.toString())
  const ret = bufferSplit(data, '\r\n')
  const headers: SocketHeader = {}
  ret.slice(1).forEach(v => {
    const r2 = bufferSplit(v, ': ')
    const [key, value] = r2
    if (!key || !value) return
    headers[key.toString() as keyof SocketHeader] = value.toString()
  })
  return headers
}

/*
  TCP 握手
  Client: 发送请求头，附带密钥
  Server: 验证是否是websokcet，然后回应响应头
  Client: 验证响应头，连接完成
 */



interface SocketHeader {
  'Host'?: string
  'Connection'?: string
  'Pragma'?: string
  'Cache-Control'?: string
  'User-Agent'?: string
  'Upgrade'?: string
  'Origin'?: string
  'Sec-WebSocket-Version'?: string
  'Accept-Encoding'?: string
  'Accept-Language'?: string
  'Sec-WebSocket-Key'?: string
  'Sec-WebSocket-Extensions'?: string
}

/*
  GET / HTTP/1.1
  Host: 127.0.0.1:8888
  Connection: Upgrade
  Pragma: no-cache
  Cache-Control: no-cache
  User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36
  Upgrade: websocket
  Origin: file://
  Sec-WebSocket-Version: 13
  Accept-Encoding: gzip, deflate, br
  Accept-Language: zh-CN,zh;q=0.9
  Sec-WebSocket-Key: lchQ1h5pKNSSFrwlPzLG5Q==
  Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
 */