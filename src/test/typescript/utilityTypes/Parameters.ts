/**
 * Parameters ->
 * type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
 * 获取函数参数的类型，以元组返回
 */

namespace TestParameters {
  type F0 = (name:string, age:number) => boolean

  type R0 = Parameters<F0>

}
