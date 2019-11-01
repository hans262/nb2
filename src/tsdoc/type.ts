/**
 * 类型别名 ->
 * 自定义类型，类似接口
 * 
 */

namespace TestType {
  type T1 = Array<string | number | boolean>
  type T2 = { name?: string; age: number }

  //字符串字面量类型，数字类型
  type T3 = 'click' | 'scroll' | 'mousemove'
  type T4 = 1 | 2 | 3

  //类型获取
  const test: T2 = { name: 'zz', age: 18 }
  type T5 = typeof test
  
  //只读关键词
  const testA: readonly number[] = [1, 2, 3]
  const testB: readonly [number, string] = [2, 'hello']
}
