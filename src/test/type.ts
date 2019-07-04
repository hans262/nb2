/**
 * 类型别名 ->
 * 自定义类型，类似接口
 */

type T45 = Array<string | number | boolean>
type T46 = { name?: string; age: number }

//字符串字面量类型，数字类型
type T47 = 'click' | 'scroll' | 'mousemove'
type T49 = 1 | 2 | 3

//类型获取
const testT46: T46 = { name: 'zz', age: 18 }
type T48 = typeof testT46

//只读关键词
const testA: readonly number[] = [1, 2, 3]
const testB: readonly [number, string] = [2, 'hello']

/**
 * const assertions ->
 * 只读断言，将任意值断言成只读类型，包括子项
 */
const x = { text: 'hello' } as const
let y = 25 as const