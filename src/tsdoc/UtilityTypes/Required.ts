/**
 * Required ->
 * type Required<T> = { [P in keyof T]-?: T[P]; }
 * 使T中的所有属性都是必需的
 */
type P3 = {
  name?: string;
  age?: number;
  location: string
}
type T22 = Required<P3>