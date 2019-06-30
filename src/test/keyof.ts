/**
 * keyof ->
 * 
 * 作用：映射类型
 * 获取对象，属性名称字符串字面量类型的联合类型
 * 注：获取的是类型，而非值
 */

type Persion = {
  name: string
  age: number
  location: string
}
type K1 = keyof Persion
type K2 = keyof Array<Persion>
type K3 = keyof { [index: number]: Persion }

//映射可选
type T27<T> = {
  [P in keyof T]?: T[P]
}
type TestT27 = T27<Persion>

//映射只读
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

//映射非可选
type T28<T> = {
  [P in keyof T]-?: T[P]
}
type TestT28 = T28<TestT27>