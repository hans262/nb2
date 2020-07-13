namespace Test {
  /**
   * 问题
   * 
   * 如何合并两个对象类型? 必须保证两个对象类型没有相同键
   * type A = { name: string } tyoe B = { age: number }
   * type C = Union<A, B>
   * 
   */

  type A = { name: string }
  type B = { age: number }

  type Merge<O, P> = { [X in keyof (O & P)]: (O & P)[X] }
  type R = Merge<A, B>
  
}