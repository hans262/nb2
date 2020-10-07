/**
 * forEach
 * 
 * 遍历数组
 * 无返回值
 * 不能跳出循环体
 * 不能修改原数组
 * 
 * 可通过索引修改原数组
 * 
 */

let arr=[1,2,3,4,5,6]

arr.forEach((v,i)=>{
  arr[i]=v*2
})

console.log(arr)