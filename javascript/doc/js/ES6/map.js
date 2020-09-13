/**
 * map
 * 
 * 键值映射
 * 可用任意类型当作键
 * 
 * size
 * set(key,value)
 * get(key)
 * has(key)
 * delete(key)
 * clear()
 * for of
 */

const myMap=new Map()
myMap.set('name','huahua')
myMap.set('age','18')

console.log(myMap.has('name'))
// myMap.clear()
console.log(myMap.size)