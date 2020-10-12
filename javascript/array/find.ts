/**
 * Array.prototype.find(
 *  predicate: (value: T, index: number, obj: T[]) => unknown, 
 *  thisArg?: any
 * ): T | undefined;
 * 找出第一个符合条件的数组成员
 * 
 */

namespace Test {
  const arr = [
    { name: 'aa', age: 1 },
    { name: 'bb', age: 2 },
    { name: 'cc', age: 3 }
  ]
  const r0 = arr.find(x => x.age > 1)
  console.log(r0)
}