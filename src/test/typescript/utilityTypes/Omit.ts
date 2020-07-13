/**
 * Omit ->
 * type Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }
 * 辅助类型，从T类型中剔除K属性
 */

namespace TestOmit {
  type T0 = {
    name: string
    age: number
    location: string
  }

  type MyOmit = Omit<T0, 'name'>
  
}
