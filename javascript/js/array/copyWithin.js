/**
 * Array.prototype.copyWithin(target:number, start?:number, end?:number)
 * 
 * target 从该位置开始替换数据
 * start 从该位置开始读取数据
 * end 到该位置前停止读取数据
 * 
 */

const arr=[1, 2, 3, 4, 5]

console.log(arr.copyWithin(0, 3))
console.log(arr)