/**
 * 多参数泛型
 * 交换元组顺序例子
 */
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
const result: [string, number] = swap([7, 'seven'])

/**
 * 泛型约束 ->
 * 含义：约束泛型参数符合一些特征
 */
interface Lengthwise {
  length: number
}
//约束 泛型T必须符合接口 Lengthwise 的形状
function tests<T extends Lengthwise>(arg: T): number {
  return arg.length
}

/**
 * 约束例子：要求T继承U
 * 拷贝另一个对象属性的例子
 */
function copyFields<T extends U, U>(target: T, source: U): T {
  const result: T = { ...target }
  for (let key in source) {
    result[key] = (<T>source)[key]
  }
  return result
}
const a = { name: '花花', age: 18, like: '种菜' }
const b = { age: 20, like: '打篮球' }
const c = copyFields(a, b)
debugger