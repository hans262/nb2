/**
 * InstanceType ->
 * type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any
 * 获取类类型的实例类型
 * 
 */

namespace TestInstanceType {
  class Test { }
  type T1 = InstanceType<new() => Test>
  type T2 = InstanceType<typeof Test>
}
