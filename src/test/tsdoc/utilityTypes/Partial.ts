/**
 * Partial ->
 * type Partial<T> = { [P in keyof T]?: T[P]; }
 * 映射可选
 */

namespace TestPartial {
  type T0 = { name: string; age: number; location: string }
  type R0 = Partial<T0>
  
}
