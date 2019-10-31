/**
 * 类型断言 -> Type Assertions
 * 将一个联合类型变量指定为一个更加具体的类型，你明确的知道它的类型。
 * 只是在编译阶段起作用
 * 
 * 注：
 * 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的。
 * 在不必要的时候，才会使用断言，断言并不是好的习惯
 * 类型断言只在当前表达式起作用，不对类型做转换
 * 
 * 非空断言 -> Type!
 * 你明确的知道一个变量不为 null | undefined
 * 
 * 只读断言 -> as const
 * 只读断言，将任意值断言成只读类型，包括子项
 * 
 */

namespace TestTypeAssertions {
  //as断言
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

  //非空断言
  function getName(student?: { name: string }): string {
    return student!.name
  }

  //只读断言
  const x = { text: 'hello' } as const
  let y = 25 as const
}
