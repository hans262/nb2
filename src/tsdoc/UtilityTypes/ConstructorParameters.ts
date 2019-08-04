/**
 * ConstructorParameters ->
 * 获取构造函数参数的类型，以元组返回
 */
class P4 {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

type T25 = ConstructorParameters<typeof P4>