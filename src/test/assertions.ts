/**
 * 断言 ->
 * 广义：在程序中的某个特定点该表达式值为真。
 * 含义：将一个联合类型的变量指定为一个更加具体的类型。
 * 注：类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的。
 */

function getLength(something: string | number | boolean): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}
const len: number = getLength(123)
const len2: number = getLength('hello')
const len3: number = getLength(true)
debugger

/**
 * const 断言 ->
 * 断言成只读功能
 */

const x = { text: 'hello' } as const
let y = 25 as const