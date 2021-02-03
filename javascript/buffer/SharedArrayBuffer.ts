/**
 * SharedArrayBuffer()
 * 分配一段内存缓冲区，类似ArrayBuffer
 * 需通过数据视图读写
 * 可在多线程中共享此内存地址
 * 
 */

namespace TestSharedArrayBuffer {
  //创建64个字节的区域
  let sab = new SharedArrayBuffer(64)
  //创建8位无符号整型视图，每个位置占一个字节
  let u8v = new Uint8Array(sab)
  u8v.fill(255)
  console.log(u8v)
  debugger
  
}
