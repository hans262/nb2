import { DataFrame } from "../ainterface/Headers.js";

/**
 * 数据帧的解码
 * @param e 源
 */
export function decodeDataFrame(e: Buffer): DataFrame {
  let i = 0, j: number, PayloadData: Buffer, MaskingKey: number[] | undefined
  //FIN为第一个字节符号位，即首位
  const FIN = e[i] >> 7
  //Opcode为第一个字节后四位
  const Opcode = e[i++] & 0b00001111
  //Mask为第二个字节符号位，即首位
  const Mask = e[i] >> 7
  //数据长度位第二个字节后七位
  let PayloadLength = e[i++] & 0b01111111
  // console.log(PayloadLength)
  if (PayloadLength === 126) {
    // e.readUInt16BE(2)
    //真实长度大于125，读取后面2个字节，表示的16位无符号整数
    PayloadLength = (e[i++] << 8) + e[i++]
  } else if (PayloadLength === 127) {
    // e.readBigInt64BE(2)  or  e.readUInt32BE(2) + e.readUInt32BE(6)
    //真实长度大于65535，读取后面2个字节，表示的64位无符号整数
    i += 4 //前四位一般为0，因为没有那么大的数据体
    let a = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++]
    PayloadLength =a
  }
  //判断是否使用掩码
  if (Mask) {
    //掩码实体，为后续四个字节
    MaskingKey = [e[i++], e[i++], e[i++], e[i++]]
    //数据和掩码做异或运算
    PayloadData = Buffer.allocUnsafe(PayloadLength) //使用不安全的内存分配，提升性能
    for (j = 0; j < PayloadLength; j++) {
      PayloadData[j] = e[i + j] ^ MaskingKey[j % 4]
    }
  }else{
    //否则直接截取数据
    PayloadData = e.slice(i, i + PayloadLength)
  }
  return { FIN, Opcode, Mask, MaskingKey, PayloadData, PayloadLength }
}

/**
 * 数据帧的编码
 * @param e 源
 */
export function encodeDataFrame(e: DataFrame): Buffer {
  let s: number[] =[], d = e.PayloadData, l = d.byteLength
  //填充第一个字节
  s.push((e.FIN << 7) + e.Opcode)
  //填充第二个字节，数据长度，永远不使用掩码
  if(l < 126) s.push(l)
  else if (l < 0x10000) s.push(126, l >> 8, l & 0b11111111) // s.writeUInt16BE(l, 2)
  else s.push(
    127, 0, 0, 0, 0,
    (l & 0xFF000000) >> 24, (l & 0xFF0000) >> 16, (l & 0xFF00) >> 8, l & 0xFF
  )//s.writeBigUInt64BE(BigInt(l), 2)  or s.writeUInt32BE(0, 2); s.writeUInt32BE(l, 6)
  //合并数据
  return Buffer.concat([Buffer.from(s), d])
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

/*
  |Opcode  | Meaning                             | Reference  |
 -+--------+-------------------------------------+------------+
  | 0x0    | Continuation Frame                  | RFC 6455   |
 -+--------+-------------------------------------+------------+
  | 0x1    | Text Frame                          | RFC 6455   |
 -+--------+-------------------------------------+------------+
  | 0x2    | Binary Frame                        | RFC 6455   |
 -+--------+-------------------------------------+------------+
  | 0x3-7  | Reserved non-control Frame          | RFC 6455   |
 -+--------+-------------------------------------+------------+
  | 0x8    | Connection Close Frame              | RFC 6455   |
 -+--------+-------------------------------------+------------+
  | 0x9    | Ping Frame                          | RFC 6455   |
 -+--------+-------------------------------------+------------+
  | 0xA    | Pong Frame                          | RFC 6455   |
 -+--------+-------------------------------------+------------+
  | 0xB-F  | Reserved control Frame              | RFC 6455   |
 -+--------+-------------------------------------+------------+
 */

/**
 * 数据帧解析规则
 *
 * 第一个字节
 * 0   = FIN
 * 1-3 = RSV 1-3
 * 4-7 = Opcode
 * 
 * 第二个字节
 * 0   = Mask 掩码，是否加密数据
 * 1-7 = len
 * len < 126  数据长度 = len，< 126字节
 * len = 126  数据长度 = 后面二个字节表示的，16位无符号整数，<65535字节
 * len = 127  数据长度 = 后面八个字节表示的，64位无符号整数，<64位无符号整数所表示的最大数个字节
 *
 * Mask = 1
 * 后续四个字节 = Maskingkey 掩码实体
 *
 * 后续字节 = 数据实体
 * 有掩码的需要异或运算
 *
 */