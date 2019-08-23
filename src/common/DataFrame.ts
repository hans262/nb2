import { DataFrame } from "../Interface/Headers";

/**
 * 数据帧的解码
 * @param e 源
 */
export function decodeDataFrame(e: Buffer): DataFrame {
  let i = 0, j = 0, PayloadData: Buffer, MaskingKey: number[] | undefined
  //FIN为第一个字节符号位，即首位
  const FIN = e[i] >> 7
  //获取opcode为第一个字节的后四位
  const Opcode = e[i++] & 0b00001111
  //Mask为第二个字节的符号位即首位，客户端请求必须为1
  const Mask = e[i] >> 7
  //数据长度位第二个字节的后七位
  let PayloadLength = e[i++] & 0b01111111
  console.log(PayloadLength)
  if (PayloadLength == 126) {
    //真实长度大于125，读取后面2字节，后续2个字节代表一个16位的无符号整数
    // console.log(e.readUInt16BE(2))
    PayloadLength = (e[i++] << 8) + e[i++]
  } else if (PayloadLength == 127) {
    //真实长度大于65535，读取后面8字节，后续8个字节代表一个64位的无符号整数（最高位为0）
    // console.log(e.readUInt32BE(2) + e.readUInt32BE(6))
    // console.log(e.readBigInt64BE(2))
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
 * 发送大数据出现bug
 * @param e 源
 */
export function encodeDataFrame(e: DataFrame): Buffer {
  let s: number[] = [], o = e.PayloadData, l = o.byteLength
  //输入第一个字节
  s.push((e.FIN << 7) + e.Opcode)
  //输入第二个字节，判断它的长度并放入相应的后续长度消息
  //永远不使用掩码
  if (l < 126) s.push(l)
  else if (l < 0x10000) s.push(126, l >> 8, l & 0b11111111) //buffer.writeUInt16BE(l, 2)
  else s.push(
    127, 0, 0, 0, 0, //8字节数据，前4字节一般没用留空
    (l & 0xFF000000) >> 6, (l & 0xFF0000) >> 4, (l & 0xFF00) >> 2, l & 0xFF
  )//buffer.writeUInt32BE(0, 2) buffer.writeUInt32BE(l, 6)

  //返回头部分和数据部分的合并缓冲区
  return Buffer.concat([Buffer.from(s), o])
}

/**
 * 8位无符号整数  占 1个字节
 * 16位无符号整数 占 2个字节
 * 34位无符号整数 占 4个字节
 * 64位无符号整数 占 8个字节
 * 
 * 64位无符号整数 表示的最大数为：
 * 2n ** 64n = 18446744073709551616n
 * 即 0 ~ 18446744073709551615n
 * 
 * const test = Buffer.alloc(20)
 * test.writeBigUInt64BE(18446744073709551615n)
 * console.log(test)
 * test 占用了前8个位置，每个位置位255
 * 
 * buffer取值范围位 0 ~ 255
 * 
 * 创建一个无符号的16位整型数组，每个位置占用2个字节
 * const arr = new Uint16Array(20)
 * 所以arr总共占40个字节
 * 
 */

/*
  64位无符号整型 转十进制
  00000000 00000000 00000000 00000000 11110000 00001111 11110000 00001111
  a[4] << 24 = 11110000 00000000 00000000 00000000  +
  a[5] << 16 = 00001111 00000000 00000000           +
  a[6] << 8  = 11110000 00000000                    +
  a[7]       = 00001111                             
*/

/**
 * (l & 0xFF000000) >> 6, (l & 0xFF0000) >> 4, (l & 0xFF00) >> 2, l & 0xFF
 * (l & 0b11111111_00000000_00000000_00000000) >> 6, (l & 0b11111111_00000000_00000000) >> 4, (l & 0b11111111_00000000) >> 2, l & 0b11111111
 * 
 * 0b11_00_10_11 & 0b00_00_11_00 = 0b00_00_10_00 >> 2 = 0b00_00_00_10
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

/**
 * 数据帧规则
 * 
 * 第一个字节
 * 首位 = FIN 后四位 = Opcode
 * 
 * 第二个字节
 * 首位 = Mask 后七位 = len
 * len < 126  数据长度 = len，< 126字节
 * len = 126  数据长度 = 后面二个字节表示的，16位无符号整数，<65535字节
 * len = 127  数据长度 = 后面八个字节表示的，64位无符号整数，<64位无符号整数所表示的最大数个字节
 * 
 * Mask = 1
 * 后续四个字节 = Maskingkey掩码实体
 * 
 * 后续字节 = 数据实体
 * 有掩码的需要异或运算
 * 
 */