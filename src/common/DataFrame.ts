import { DataFrame } from "../Interface/Headers";

/**
 * 数据帧的解码
 * @param e 源
 */
export function decodeDataFrame(e: Buffer): DataFrame {
  let i = 0, j = 0, PayloadData: Buffer, MaskingKey: number[] | undefined
  //解析前两个字节的基本数据

  //FIN为第一个字节的首位，所以右移7位，一个字节总共8位
  const FIN = e[i] >> 7

  //获取opcode的值，opcode为第一个字节的4-7位
  //与15位运算之后前四位即为0，得到后四位的值
  const Opcode = e[i++] & 0b00001111

  //Mask的值为第二个字节的首位，客户端请求必须为1
  const Mask = e[i] >> 7

  let PayloadLength = e[i++] & 0x7F ////数据长度

  //len占一个字节，最大存储值为127
  if (PayloadLength == 126) {
    //真实长度大于125，读取后面2字节，后续2个字节代表一个16位的无符号整数，该无符号整数的值为数据的长度
    PayloadLength = (e[i++] << 8) + e[i++]
  } else if (PayloadLength == 127) {
    //数据量过大这里出现bug
    //真实长度大于65535，读取后面8字节，后续8个字节代表一个64位的无符号整数（最高位为0），该无符号整数的值为数据的长度
    i += 4 //长度一般用四字节的整型，前四个字节通常为长整形留空的
    PayloadLength = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++]
  }
  //判断是否使用掩码
  if (Mask) {
    //获取掩码实体
    MaskingKey = [e[i++], e[i++], e[i++], e[i++]]
    //对数据和掩码做异或运算
    PayloadData = Buffer.alloc(PayloadLength)
    for (j = 0; j < PayloadLength; j++) {
      PayloadData[j] = e[i + j] ^ MaskingKey[j % 4]
    }
  } else {
    //否则直接使用数据
    PayloadData = e.slice(i, i + PayloadLength)
  }
  //返回数据帧
  return { FIN, Opcode, Mask, MaskingKey, PayloadData, PayloadLength }
}

/**
 * 数据帧的编码
 * @param e 源
 */
export function encodeDataFrame(e: DataFrame): Buffer {
  let s: number[] = [], o = e.PayloadData, l = o.byteLength
  //输入第一个字节
  s.push((e.FIN << 7) + e.Opcode)
  //输入第二个字节，判断它的长度并放入相应的后续长度消息
  //永远不使用掩码
  if (l < 126) s.push(l)
  else if (l < 0x10000) s.push(126, l >> 8, l & 0xFF)
  else s.push(
    127, 0, 0, 0, 0, //8字节数据，前4字节一般没用留空
    (l & 0xFF000000) >> 6, (l & 0xFF0000) >> 4, (l & 0xFF00) >> 2, l & 0xFF
  )
  //返回头部分和数据部分的合并缓冲区
  return Buffer.concat([Buffer.from(s), o])
}

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