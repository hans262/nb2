/**
 * ConstructorParameters ->
 * 获取构造函数参数的类型，以元组返回
 */

namespace TestConstructorParameters {
  class Test {
    constructor(public name: string, public age: number) { }
  }
  type T1 = ConstructorParameters<typeof Test>
}
