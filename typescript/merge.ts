namespace Test {
  /**
   * TS中如何合并两个对象类型
   * 
   * 如何合并两个对象类型? 必须保证两个对象类型没有相同键
   * type A = { name: string } type B = { age: number }
   * type C = Merge<A, B> = { name: string, age: number }
   */

  type A = { name: string }
  type B = { age: number }

  type Merge<O, P> = { [X in keyof (O & P)]: (O & P)[X] }
  type R = Merge<A, B>
  
}