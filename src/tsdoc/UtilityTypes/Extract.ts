/**
 * Extract ->
 * type Extract<T, U> = T extends U ? T : never
 * 从T中提取可分配给U的类型
 */

namespace TestExtract {
  type T1 = 'a' | 'b' | 'c'
  type T2 = 'b' | 'c'
  type R1 = Extract<T1, T2>
}
