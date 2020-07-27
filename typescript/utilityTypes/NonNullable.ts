/**
 * NonNullable ->
 * type NonNullable<T> = T extends null ? never : T
 * 从T中排除空值和undefined
 */

namespace TestNonNullable {
  type T1 = NonNullable<string | number | undefined | null>
}
