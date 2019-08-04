/**
 * Exclude ->
 * type Exclude<T, U> = T extends U ? never : T
 * 从T中排除那些可分配给U的类型
 */

type T00 = Exclude<'a' | 'b' | 'c', 'c'>