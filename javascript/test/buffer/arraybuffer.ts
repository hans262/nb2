/**
 * ArrayBuffer
 * 通用的、固定长度的原始二进制数据缓冲区
 * 
 * 分配一段内存缓冲区，但是不能直接读写
 * 只能通过 类型数组对象TypedArray或数据视图DataView 来操作
 * 
 */

namespace TestArrayBuffer {
  //分配一个字节的缓冲区
  const ab = new ArrayBuffer(5)
  console.log(ab)

  //获取内存大小 单位字节
  console.log(ab.byteLength)

  //拷贝一段内存区域
  const cab = ab.slice(3)
  console.log(cab)

  //判断传入的参数值是否是TypedArray或DataView 
  console.log(ArrayBuffer.isView(new Int32Array()))
  
}
