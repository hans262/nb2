import { createServer, Socket } from 'net'
import { bufferSplit } from '../modules/bufferSplit';
import { createHash } from 'crypto';

const server = createServer()

server.on('connection', (socket: Socket) => {
  console.log(socket)
  socket.once('data', (data: Buffer) => {
    const ret: Buffer[] = bufferSplit(data, '\r\n')

    const headers: any = {}
    ret.slice(1).forEach(v => {
      const r2 = bufferSplit(v, ': ')
      headers[r2[0].toString()] = r2[1].toString()
    })

    console.log(headers)
    if (headers['Upgrade'] !== 'websocket') {
      console.log('非WebSocket连接')
      return socket.end()
    }
    if (headers['Sec-WebSocket-Version'] !== '13') {
      // 判断WebSocket版本是否为13，防止是其他版本，造成兼容错误
      return socket.end()
    }

    const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
    const key = headers['Sec-WebSocket-Key']
    // 创建一个签名算法为sha1的哈希对象
    const hash = createHash('sha1')
    hash.update(`${key}${GUID}`)
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


//数据帧的解码
function decodeDataFrame(e: any) {
  var i = 0, j, s, frame: any = {
    //解析前两个字节的基本数据
    FIN: e[i] >> 7, Opcode: e[i++] & 15, Mask: e[i] >> 7,
    PayloadLength: e[i++] & 0x7F
  };
  //处理特殊长度126和127
  if (frame.PayloadLength == 126)
    frame.length = (e[i++] << 8) + e[i++];
  if (frame.PayloadLength == 127)
    i += 4, //长度一般用四字节的整型，前四个字节通常为长整形留空的
      frame.length = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++];
  //判断是否使用掩码
  if (frame.Mask) {
    //获取掩码实体
    frame.MaskingKey = [e[i++], e[i++], e[i++], e[i++]];
    //对数据和掩码做异或运算
    for (j = 0, s = []; j < frame.PayloadLength; j++)
      s.push(e[i + j] ^ frame.MaskingKey[j % 4]);
  } else s = e.slice(i, frame.PayloadLength); //否则直接使用数据
  //数组转换成缓冲区来使用
  s = Buffer.from(s)
  //如果有必要则把缓冲区转换成字符串来使用
  if (frame.Opcode == 1) s = s.toString();
  //设置上数据部分
  frame.PayloadData = s;
  //返回数据帧
  return frame;
}

//数据帧的编码
function encodeDataFrame(e: any) {
  var s = [], o = Buffer.from(e.PayloadData), l = o.length;
  //输入第一个字节
  s.push((e.FIN << 7) + e.Opcode);
  //输入第二个字节，判断它的长度并放入相应的后续长度消息
  //永远不使用掩码
  if (l < 126) s.push(l);
  else if (l < 0x10000) s.push(126, (l & 0xFF00) >> 2, l & 0xFF);
  else s.push(
    127, 0, 0, 0, 0, //8字节数据，前4字节一般没用留空
    (l & 0xFF000000) >> 6, (l & 0xFF0000) >> 4, (l & 0xFF00) >> 2, l & 0xFF
  );
  //返回头部分和数据部分的合并缓冲区
  return Buffer.concat([Buffer.from(s), o]);
}