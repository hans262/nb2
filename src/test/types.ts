/**
 * 类型别名 ->
 * 给一个类型起个新名字，类似接口
 */
type MyArray = Array<string | number | boolean>
const array: MyArray = [125, 'hello', true]
type MyObject = { name?: string }
const object: MyObject = { name: 'huahua' }

/**
 * 联合类型 ->
 * 取值可以为多种类型中的一种
 */
const myArray: Array<string | number> = [123, 'hello']

/**
 * 枚举 ->
 * 取值被限定在一定范围内的值
 * 特殊的值，特殊的类型
 */
enum Status { Ready, Waiting }
const myStatus: Status = Status.Ready
enum Size { L = 120, M = 110, S = 100 }
const size: Size = Size.M

/**
 * 元组 ->
 * 已知数量和类型的数组，
 * 通常表示一组映射
 */
const Person: [string, number] = ['huahua', 18]

/**
 * 只读声明 ->
 */
const testA: readonly number[] = [1, 2, 3]
const testB: readonly [number, string] = [2, 'hello']