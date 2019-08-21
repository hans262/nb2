import { DataFrame } from "../Interface/Headers";

/**
 * 数据帧的解码
 * @param e 源
 */
export function decodeDataFrame(e: Buffer): DataFrame {
  let i = 0, j, s: Buffer
  //解析前两个字节的基本数据
  const frame: DataFrame = {
    FIN: e[i] >> 7,
    Opcode: e[i++] & 15,
    Mask: e[i] >> 7,
    PayloadLength: e[i++] & 0x7F, //数据真实字节长度
    PayloadData: ''
  }

  //因len位占一个字节，最大存储为127
  //126 后续2个字节代表一个16位的无符号整数，该无符号整数的值为数据的长度。
  //127 后续8个字节代表一个64位的无符号整数（最高位为0），该无符号整数的值为数据的长度。
  //处理特殊长度126和127
  if (frame.PayloadLength == 126) {
    frame.PayloadLength = (e[i++] << 8) + e[i++]
  } else if (frame.PayloadLength == 127) {
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
    s = e.slice(i, i + frame.PayloadLength)
  }

  frame.PayloadData = s.toString()
  //返回数据帧
  return frame
}

/**
 * 数据帧的编码
 * 当字节数超过265 248个的时候出现bug
 * @param e 源
 */
export function encodeDataFrame(e: DataFrame): Buffer {
  let s: number[] = [], o = Buffer.from(e.PayloadData, 'binary'), l = o.byteLength
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