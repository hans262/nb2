/**
 * Record ->
 * type Record<K extends string | number | symbol, T> = { [P in K]: T; }
 * 构造一个具有T类型的一组属性K的类型
 */

namespace TestRecord {
  type R0 = Record<'name' | 'age', string>
}
