/**
 * Object.entries<T>(o: { [s: string]: T } | ArrayLike<T>): [string, T][];
 * 把对象按键值对数组返回
 * 
 */

namespace Test {
  const obj = { name: 'ww', age: 18, location: 'sc' }
  const ret = Object.entries(obj)
  console.log(ret)
}
