/**
 * ArrayBuffer
 * 分配一段内存缓冲区，但是不能直接读写
 * 只能通过 TypedArray DataView 读写
 * 
 */

namespace TestArrayBuffer {
  let ab = new ArrayBuffer(16)
  let view = new DataView(ab)
  //前八个字节写入8位无符号整数
  view.setBigUint64(0, 18446744073709551615n)
  console.log(view.getBigUint64(0))
  
  //全部填充
  let ab2 = new ArrayBuffer(10)
  let u8a = new Uint8Array(ab2)
  u8a.fill(50)
  console.log(u8a)
  
  /**
   * ArrayBuffer | ArrayBufferView  <=> string
   * 互转
   */

  const enCoder = new TextEncoder()
  const uint8: Uint8Array = enCoder.encode('hello 你好!')
  const deCoder = new TextDecoder('utf-8')
  const ret = deCoder.decode(uint8)
  console.log(ret)
  debugger
}
