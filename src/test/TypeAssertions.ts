/**
 * 类型断言 -> Type assertions
 * 
 * 广义：在程序中的某个特定点该表达式值为真。
 * 含义：将一个联合类型的变量指定为一个更加具体的类型，你明确的知道他的类型。
 * 
 * 注：类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的。
 * 在不必要的时候，才会使用断言，断言并不是好的习惯
 */

function getLength(something: string | number | boolean): number {
  if ((<string>something).length) {
    return (<string>something).length
  } else {
    return something.toString().length
  }
}
const len: number = getLength(123)
const len2: number = getLength('hello')
const len3: number = getLength(true)

/**
 * 非空断言 -> Type!
 * 你明确的知道一个变量不为 null | undefined
 */
function getName(student?: { name: string }): string {
  return student!.name
}