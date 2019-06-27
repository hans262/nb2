/**
 * Readonly ->
 * type Readonly<T> = { readonly [P in keyof T]: T[P]; }
 * 使T中的所有属性为只读
 */

type T31 = {
  name: string
  age: number
}
type T32 = Readonly<T31>