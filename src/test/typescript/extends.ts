/**
 * extends ->
 * 类型约束 & 条件类型
 * 传入的类型被约束在某个范围内
 * 
 */

namespace TestExtends {
  type T1<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object"

  type T2 = T1<string>
  type T3 = T1<"abc">
  type T4 = T1<true>
  type T5 = T1<() => void>
  type T6 = T1<string[]>
}
