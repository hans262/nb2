/**
 * never ->
 * 表示那些永不存在的值的类型
 * 总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
 * never类型是任何类型的子类型，没有类型是never的子类型
 * 
 */

namespace TestNever {
  type Foo = {
    type: 'foo'
  }
  type Bar = {
    type: 'bar'
  }
  type Check<T> =
    T extends Foo ? Foo :
    T extends Bar ? Bar :
    never

  type R1 = Check<Bar>
  type R2 = Check<'t'>
  type R3 = 'a' & 'b'

  type T3 = unknown
  const ttt: T3 = 12
  
}
