import { createServer, Socket } from 'net'
import { bufferSplit } from '../modules/bufferSplit';
import { createHash } from 'crypto';

const server = createServer()
server.on('connection', (socket: Socket) => socket.once('data', socket_once))
server.listen(8888)

const sockets = new Map<number, Socket>()

function socket_once(this: Socket, data: Buffer): void {
  const headers: Headers = parse_headers(data)
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
  // 客户端发起了断开连接
  if (frame.Opcode === 8) {
    return this.end()
  }
  // this.write(encodeDataFrame(frame))
  //群发
  sockets.forEach(s => s.write(
    encodeDataFrame(frame)
  ))
}

interface Headers {
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

function parse_headers(data: Buffer): Headers {
  const ret: Buffer[] = bufferSplit(data, '\r\n')
  const headers: Headers = {}
  ret.slice(1).forEach(v => {
    const r2 = bufferSplit(v, ': ')
    const [key, value] = r2
    if (!key || !value) return
    headers[key.toString() as keyof Headers] = value.toString()
  })
  return headers
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
    'Sec-Websocket-Accept: ' + accept + '\r\n\r\n',
  ]
  return headers.join('\r\n')
}

interface DataFrame {
  FIN: number
  Opcode: number
  Mask: number
  PayloadLength: number
  MaskingKey?: number[]
  PayloadData: string
}

//数据帧的解码
function decodeDataFrame(e: Buffer): DataFrame {
  let i = 0, j, s: Buffer
  //解析前两个字节的基本数据
  const frame: DataFrame = {
    FIN: e[i] >> 7,
    Opcode: e[i++] & 15,
    Mask: e[i] >> 7,
    PayloadLength: e[i++] & 0x7F, //数据真实字节长度
    PayloadData: ''
  }

  //处理特殊长度126和127
  if (frame.PayloadLength == 126) {
    frame.PayloadLength = (e[i++] << 8) + e[i++]
  }
  if (frame.PayloadLength == 127) {
    i += 4 //长度一般用四字节的整型，前四个字节通常为长整形留空的
    frame.PayloadLength = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++]
  }

  //判断是否使用掩码
  if (frame.Mask) {
    //获取掩码实体
    frame.MaskingKey = [e[i++], e[i++], e[i++], e[i++]]
    //对数据和掩码做异或运算
    s = Buffer.alloc(frame.PayloadLength)
    for (j = 0; j < frame.PayloadLength; j++) {
      s[j] = e[i + j] ^ frame.MaskingKey[j % 4]
    }
  } else {
    //否则直接使用数据
    s = e.slice(i, frame.PayloadLength)
  }

  frame.PayloadData = s.toString()
  //返回数据帧
  return frame
}

//数据帧的编码
function encodeDataFrame(e: DataFrame): Buffer {
  let s: number[] = [], o = Buffer.from(e.PayloadData), l = o.length
  //输入第一个字节
  s.push((e.FIN << 7) + e.Opcode)
  //输入第二个字节，判断它的长度并放入相应的后续长度消息
  //永远不使用掩码
  if (l < 126) s.push(l)
  else if (l < 0x10000) s.push(126, (l & 0xFF00) >> 2, l & 0xFF)
  else s.push(
    127, 0, 0, 0, 0, //8字节数据，前4字节一般没用留空
    (l & 0xFF000000) >> 6, (l & 0xFF0000) >> 4, (l & 0xFF00) >> 2, l & 0xFF
  )
  //返回头部分和数据部分的合并缓冲区
  return Buffer.concat([Buffer.from(s), o])
}

/*
  TCP 握手
  Client: 发送请求头，附带密钥
  Server: 验证是否是websokcet，然后回应响应头
  Client: 验证响应头，连接完成
 */

/*
  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
  +-+-+-+-+-------+-+-------------+-------------------------------+
  |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
  |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
  |N|V|V|V|       |S|             |   (if payload len==126/127)   |
  | |1|2|3|       |K|             |                               |
  +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
  |     Extended payload length continued, if payload len == 127  |
  + - - - - - - - - - - - - - - - +-------------------------------+
  |                               |Masking-key, if MASK set to 1  |
  +-------------------------------+-------------------------------+
  | Masking-key (continued)       |          Payload Data         |
  +-------------------------------- - - - - - - - - - - - - - - - +
  :                     Payload Data continued ...                :
  + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
  |                     Payload Data continued ...                |
  +---------------------------------------------------------------+
 */

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