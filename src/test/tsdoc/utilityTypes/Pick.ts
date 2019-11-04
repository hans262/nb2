/**
 * Pick ->
 * type Pick<T, K extends keyof T> = { [P in K]: T[P]; }
 * 从T类型中，筛选U类型所包含的键
 */

namespace TestPick {
  type T0 = { name: string; age: number; location: string }
  type T30 = Pick<T0, 'name' | 'age'>
}
