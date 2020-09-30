/**
 * Arrat.prototype.push(...items: T[]): number;
 * 向数组末尾追加元素 并返回新的长度
 */

namespace Test {
  const arr = [1, 2, 3, 4, 5]
  const newLength = arr.push(6)
  console.log(arr, newLength)
}