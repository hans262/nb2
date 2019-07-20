/**
 * 类型约束 & 条件类型
 * 
 */

type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object"

type T51 = TypeName<string>
type T52 = TypeName<"a">
type T53 = TypeName<true>
type T54 = TypeName<() => void>
type T55 = TypeName<string[]>