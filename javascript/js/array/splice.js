/**
 * splice(index,howmany,item1,.....,itemX)
 * 从数组中添加/删除值，返回删除的值数组
 * 修改原数组，有返回值
 * 
 * 
 * index 添加/删除的位置
 * howmany 删除的数量 设置0不删除
 * item1 添加的值（可选）
 * 
 */

const arr=[1,2,3,4,5,6]
const arr2=arr.splice(0,1,10)
console.log(arr)