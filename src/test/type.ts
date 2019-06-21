/**
 * 类型别名 ->
 * 给一个类型起个新名字，类似接口
 */

type MyArray = Array<string | number | boolean>
const array: MyArray = [125, 'hello', true]

type MyObject = { name?: string }
const object: MyObject = { name: 'huahua' }

//获取已知对象类型
type MyType = typeof object