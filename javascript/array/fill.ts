/**
 * Array.prototype.fill(value: T, start?: number, end?: number): this;
 * 填充数组 从索引开始到结束
 * 
 */

namespace Test {
  const arr = [1, 2, 3, 4]
  console.log(arr.fill(6, 0, 2))
}