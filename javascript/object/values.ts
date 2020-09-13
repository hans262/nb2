/**
 * Object.values<T>(o: { [s: string]: T } | ArrayLike<T>): T[];
 * 返回一个给定对象自身的所有可枚举属性值的数组
 * 
 */

namespace Test {
  const obj = { name: 'ww', age: 18 }
  console.log(Object.values<string | number>(obj))

}