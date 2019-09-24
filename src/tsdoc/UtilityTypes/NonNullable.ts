/**
 * NonNullable ->
 * type NonNullable<T> = T extends null ? never : T
 * 从T中排除空值和undefined
 */

type T04 = NonNullable<string | number | undefined | null>