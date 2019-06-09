/**
 * keyof ->
 * 作用：映射类型
 * 属性名称字符串字面量类型构成的联合类型
 * 注：获取的是类型，而非值
 */

interface Persion {
  name: string
  age: number
  location: string
}
type K1 = keyof Persion
type K2 = keyof Array<Persion>
type K3 = keyof { [x: string]: Persion }

//映射只读
type Partials<T> = {
  [P in keyof T]?: T[P]
}
type PartialPerson = Partials<Persion>

//or 映射只读
type Readonlys<T> = {
  readonly [P in keyof T]: T[P]
}