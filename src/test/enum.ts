/**
 * 枚举 ->
 * 取值被限定在一定范围内的值
 * 特殊的值，特殊的类型
 */

enum Status { Ready, Waiting }
const myStatus: Status = Status.Ready

enum Size { L = 120, M = 110, S = 100 }
const size: Size = Size.M

enum Color {
  Red = '255, 0, 0',
  Green = '0, 255, 0',
  Blue = '0, 0, 255'
}
const red: Color.Red = Color.Red