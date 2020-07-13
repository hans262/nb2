/**
 * Exclude ->
 * type Exclude<T, U> = T extends U ? never : T
 * 从T中排除那些可分配给U的类型
 */

namespace TestExclude {
  type T1 = 'a' | 'b' | 'c'
  type T2 = 'c'
  type T3 = Exclude<T1, T2>
}
