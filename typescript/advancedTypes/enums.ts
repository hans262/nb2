/**
 * 枚举 -> Enums
 * 取值被限定在一定范围内的值
 * 特殊的值，特殊的类型
 * 把值作为类型
 * 
 */

namespace TestEnums {
  enum Status { Ready, Waiting }
  const status: number = Status.Ready

  let statusName: string = Status[0]
  console.log(statusName)

  enum Size { L = 120, M = 110, S = 100 }
  const size = Size[120]

  enum Color {
    Red = '255, 0, 0',
    Green = '0, 255, 0',
    Blue = '0, 0, 255'
  }
  const red = Color.Red

}
