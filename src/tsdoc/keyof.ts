/**
 * keyof ->
 * 
 * 作用：映射类型
 * 获取对象，属性名称字符串字面量类型的联合类型
 * 注：获取的是类型，而非值
 */

namespace TestKeyof {
  type Persion = {
    name: string
    age: number
    location: string
  }
  type K1 = keyof Persion
  type K2 = keyof Array<Persion>
  type K3 = keyof { [index: number]: Persion }

  //映射可选
  type T1<T> = {
    [P in keyof T]?: T[P]
  }
  type K4 = T1<Persion>

  //映射非可选
  type T2<T> = {
    [P in keyof T]-?: T[P]
  }
  type K5 = T2<Persion>

  //映射只读
  type T3<T> = {
    readonly [P in keyof T]: T[P]
  }
  type K6 = T3<Persion>

  //映射非只读
  type T4<T> = {
    -readonly [P in keyof T]: T[P]
  }
  type K7 = T4<Persion>
}
