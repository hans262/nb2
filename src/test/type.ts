/**
 * 类型别名 ->
 * 自定义一个类型，类似接口
 */

type MyArray = Array<string | number | boolean>
const array: MyArray = [125, 'hello', true]

type MyObject = { name?: string }
const object: MyObject = { name: 'huahua' }

/**
 * typeof -> 获取类型
 */
type MyType = typeof object