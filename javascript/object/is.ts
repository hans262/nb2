/**
 * Object.is(value1: any, value2: any): boolean;
 * 判断两个值是否为同一个值
 * 
 */

namespace Test {
  const a = { name: 'ww' }
  const b = a
  console.log(Object.is(a, b))

  console.log(Object.is('ww', 'ww'))

  console.log(Object.is(0, 1))
  console.log(Object.is(NaN, 0/0))

}