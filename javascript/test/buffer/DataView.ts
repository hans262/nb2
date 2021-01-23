/**
 * DataView -> 数据视图
 * 可以从二进制ArrayBuffer对象中读写多种数值类型
 * 不用考虑不同平台的字节序问题
 * 
 * BE 大端序  0000_0010
 * LE 小端序  0100_0000
 * 
 */

namespace TestDataView {

  //分配16个字节的缓冲区
  const ab = new ArrayBuffer(16)

  //为缓冲区创建数据视图
  const dv = new DataView(ab, 12, 4)

  //写入有符号8位整数-25
  dv.setInt8(0, -25)

  //读取写入的数据
  console.log(dv.getInt8(0))
}
