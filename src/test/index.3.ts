//类型别名
type MyArray = Array<string | number | boolean>
const array: MyArray = [125, 'dwq', true]
//联合类型
const myType: Array<string | number | boolean> = [123, 'hello', false]

//枚举
enum Status { Ready, Waiting }
enum Color { Red, Blue, Green }
const myStatus: Status = Status.Ready
const color: Color = Color.Blue

//元组 已知元素数量和类型的数组
let stu: [string, number]
stu[0] = 'huahua'
stu[1] = 18