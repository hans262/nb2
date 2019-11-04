/**
 * Readonly ->
 * type Readonly<T> = { readonly [P in keyof T]: T[P]; }
 * 映射只读
 */

namespace TestReadonly {
  type T0 = {
    name: string
    age: number
  }
  type T1 = Readonly<T0>
}
