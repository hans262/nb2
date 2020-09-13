/**
 * concat
 * 合并数组
 * 
 */
const arr1=[1,2,3]
const arr2=[4,5,6]
const arr=arr1.concat(arr2)

const arr3=[[1,2,3],[4,5,6],[7,8,9]]
const arr4=[].concat(...arr3)

console.log(arr4)