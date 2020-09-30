/**
 * Array.prototype.concat(...items: ConcatArray<T>[]): T[];
 * 连接一个和多个数组
 * 
 */


namespace Test {
  const arr1 = [1, 2, 3]
  const arr2 = [4, 5, 6]
  const arr3 = [7, 8, 9]

  console.log(arr1.concat(arr2, arr3))
}