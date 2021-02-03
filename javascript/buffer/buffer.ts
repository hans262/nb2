/**
 * Buffer ->
 * 二进制缓冲区
 * 每个位置占一个字节
 * 每个位置存储十进制范围：0 ~ 255
 * 
 * 
 * allocUnsafe 分配不安全的内存区域，
 * 可能携带老数据，但是性能很快
 * 
 */

namespace TestBuffer {
  const buf = Buffer.alloc(128)

  //64位无符号整数，所表示的最大数
  let MaxBigUInt64 = 2n ** 64n - 1n
  //写入64位无符号整数，占用8个字节，一个字节8位
  buf.writeBigUInt64BE(MaxBigUInt64, 0)
  //读取前八个字节的数据，以64位无符号类型读取
  console.log(buf.readBigUInt64BE(0))

  //写入64位双精度浮点数，占用8个字节
  buf.writeDoubleBE(25.4568552, 8)
  //读取当前位置64位双进度浮点数
  console.log(buf.readDoubleBE(8))

  //64位有符号整数，取值范围
  let MaxBigInt64 = 2n ** 63n - 1n
  let MinBigInt64 = -(2n ** 63n)

  //写入64位有符号整数，占8个字节
  buf.writeBigInt64BE(MinBigInt64, 16)
  //读取当前位置64位有符号整数
  console.log(buf.readBigInt64BE(16))

  console.log(buf)
  debugger
}
