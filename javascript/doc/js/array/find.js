/**
 * Array.prototype.find(func:Function)
 * 找出第一个符合条件的数组成员
 * 
 */

const arr=[1,2,3,4,{name:5}]
console.log(arr.find(x=>x.name>2))