import { createServer, Socket } from 'net'
import { bufferSplit } from '../modules/bufferSplit';
import { createHash } from 'crypto';

const server = createServer()

server.on('connection', (socket: Socket) => {
  socket.once('data', (data: Buffer) => {
    const ret: Buffer[] = bufferSplit(data, '\r\n')
    const headers: any = {}
    ret.slice(1).forEach(v => {
      const r2 = bufferSplit(v, ': ')
      headers[r2[0].toString()] = r2[1].toString()
    })
    if (headers['Upgrade'] !== 'websocket') {
      console.log('非WebSocket连接')
      return socket.end()
    }
    if (headers['Sec-WebSocket-Version'] !== '13') {
      // 判断WebSocket版本是否为13，防止是其他版本，造成兼容错误
      return socket.end()
    }

    const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
    const KEY = headers['Sec-WebSocket-Key']
    // 创建一个签名算法为sha1的哈希对象
    const hash = createHash('sha1')
    hash.update(KEY + GUID)
    const result = hash.digest('base64')
    // 生成供前端校验用的请求头
    const res22 = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      'Sec-Websocket-Accept: ' + result + '\r\n\r\n',
    ]
    socket.write(res22.join('\r\n'))

    socket.on('data', data => {
      const ret = decodeDataFrame(data)
      console.log(ret)
      // opcode为8，表示客户端发起了断开连接
      if (ret.Opcode === 8) {
        return socket.end()
      }
      socket.write(encodeDataFrame(ret))
    })
  })
})

server.listen(8888)

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

/**
 * TCP 握手
 * Client: 发送请求头，附带密钥
 * Server: 验证是否是websokcet，然后回应响应头
 * Client: 验证响应头，连接完成
 *
 */

/**
 * 二进制算法：除以2取余数，然后从下向上排列
 * 11/2 1
 * 5/2  1
 * 2/2  0
 * 1/2  1
 *
 * 1 ~ 12 二进制数字
 * 0000   0
 * 0001   1
 * 0010   2
 * 0011   3
 * 0100   4
 * 0101   5
 * 0110   6
 * 0111   7
 * 1000   8
 * 1001   9
 * 1010   10
 * 1011   11
 * 1100   12
 *
 */

/**
 * >> 右移运算符 ->
 * 11 >> 2 右移二位 = 2
 * 0000 0000 0000 0000 0000 0000 0000 1011
 *                \|/
 * 0000 0000 0000 0000 0000 0000 0000 0010
 *
 * << 左移运算符 ->
 * 3 << 2 左移二位 = 12
 * 0000 0000 0000 0000 0000 0000 0000 0011
 *                \|/
 * 0000 0000 0000 0000 0000 0000 0000 1100
 *
 *
 * ^  按位异或 -> 真真=假，真假=真，假假=假
 * 3 ^ 2 按位异或 = 1
 * 0000 0000 0000 0000 0000 0000 0000 0011
 * 0000 0000 0000 0000 0000 0000 0000 0010
 *                \|/
 * 0000 0000 0000 0000 0000 0000 0000 0001
 *
 *
 * &  位运算and -> 真真=真，真假=假，假假=假
 * 25 & 3 = 1
 * 0000 0000 0000 0000 0000 0000 0001 1001
 * 0000 0000 0000 0000 0000 0000 0000 0011
 *                \|/
 * 0000 0000 0000 0000 0000 0000 0000 0001
 *
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