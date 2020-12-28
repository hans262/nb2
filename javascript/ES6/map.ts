/**
 * Map 
 * 键值映射对象
 * size 大小
 * set(key,value)
 * get(key)
 * has(key)
 * delete(key)
 * clear()
 * for of
 * 
 */

namespace Test {
  const map = new Map<string, string>()
  map.set('name', 'huahua')
  map.set('age', '18')
  
  console.log(map.size)

  for(let v of map){
    console.log(v)
  }

}