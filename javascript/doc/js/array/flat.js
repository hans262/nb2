/**
 * arr.flat(depth)
 * 
 * depth: 深度
 * 扁平化数组
 * 方法会移除数组中的空项
 * 
 */

const arr=[1, ,[2,[3]],4]
console.log(arr.flat(Infinity))
console.log(arr)