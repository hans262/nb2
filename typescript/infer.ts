/**
 * infer ->
 * 待推断的类型
 * 可推断函数参数，或函数返回值
 * 
 */

namespace TestInfer {
  type Test = (name: string, age: number) => boolean

  //推断参数
  type T1<T> = T extends (...arg: infer P) => any ? P : never
  type R1 = T1<Test>

  //推断返回值
  type T2<T> = T extends (...arg: any[]) => infer P ? P : never
  type R2 = T2<Test>

}
