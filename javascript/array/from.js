/**
 * from
 * 将两类对象转为真正的数组
 * 
 * 类对象->
 * 类数组对象 (Array-like Object)
 * 可遍历（iterable）对象
 * Set Map
 * DOM NodeList 集合
 * 函数arguments对象
 * 
 * 
 */

const arr=[1,2,3,4,5]
const arrayLike={
  '0':'a',
  '1':'b',
  '2':'c',
  length:3
}
const arr2=Array.from(arrayLike)
const arr3=Array.from(new Set([1,2]))

const map=new Map()
map.set('name','huahua')
map.set('age',18)
const arr4=Array.from(map)

console.log(arr4)