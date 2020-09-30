/**
 * Array.prototype.pop(): T | undefined;
 * 删除数组最后一位，并返回
 * 会修改原数组
 */

namespace Test {
  const arr1 = [1, 2, 3]
  const arr2 = arr1.pop()

  console.log(arr1, arr2)
}