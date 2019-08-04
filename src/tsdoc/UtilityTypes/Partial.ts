/**
 * Partial ->
 * type Partial<T> = { [P in keyof T]?: T[P]; }
 * 使T中的所有属性为可选
 */

type P2 = { name: string; age: number; location: string }
type T40 = Partial<P2>