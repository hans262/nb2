/**
 * 类型约束 & 条件类型
 * 
 */

type T50<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object"

type T51 = T50<string>
type T52 = T50<"a">
type T53 = T50<true>
type T54 = T50<() => void>
type T55 = T50<string[]>