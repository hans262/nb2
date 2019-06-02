//类型别名 自定义类型
type MyArray = Array<string | number | boolean>
const array: MyArray = [125, 'dwq', true]
type MyObject = { name?: string }
const object:MyObject = { name: 'huahua'}

//联合类型 多个类型的组合
const myType: Array<string | number | boolean> = [123, 'hello', false]

//枚举 用来表示特殊的值，特殊的类型
enum Status { Ready, Waiting }
enum Color { Red, Blue, Green }
enum Size { L = 120, M = 110, S = 100 }
const myStatus: Status = Status.Ready
const color: Color = Color.Blue
const size: Size = Size.M

//元组 已知数量和类型的数组
const Person: [string, number] = ['huahua', 18]