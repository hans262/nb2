/**
 * Extract ->
 * type Extract<T, U> = T extends U ? T : never
 * 从T中提取可分配给U的类型
 */

type T01 = Extract<'a' | 'b' | 'c', 'b' | 'c'>