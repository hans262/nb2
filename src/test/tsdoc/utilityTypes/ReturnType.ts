/**
 * ReturnType ->
 * type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
 * 获取函数类型的返回类型
 */

namespace TestReturnType {
  type F0 = (arg: any) => boolean
  type R0 = ReturnType<F0>
}
