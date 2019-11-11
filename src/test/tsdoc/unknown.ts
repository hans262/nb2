/**
 * unknown ->
 * 任何东西都可以分配给unknown，但unknown除了本身
 * 一般用作未知类型
 * 在unknown未先声明或缩小为更具体的类型的情况下，不允许进行任何操作。
 * 
 */

namespace TestUnknown {
  type T00 = unknown & null
  type T01 = unknown & undefined

  type T10 = unknown | null
  type T11 = unknown | undefined

  let x: unknown
  x = 123
}