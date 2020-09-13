/**
 * deepCopy 深拷贝
 * 将一个对象赋值给变量的时候，修改当前变量的属性，会造成原对象的修改
 * 
 * 浅拷贝：仅仅是指向被复制的内存地址，
 * 深拷贝：在计算机中开辟新的内存地址用于存放复制的对象
 * 
 * 注：
 * ES6解构赋值是浅拷贝，如果一个键是复合类型（数组、对象、函数），
 * 那么解构赋值拷贝的是这个值的引用，即该复合类型指针指向的一个内存地址而已。
 * 
 */

namespace Test {
  function deepCopy(obj: any) {
    function isObjOrArray(r: any) {
      return Object.prototype.toString.call(r).includes('Object') || Array.isArray(obj)
    }
    //既不是数组，也不是obj对象，直接返回原值
    if (!isObjOrArray(obj)) return obj

    //数组和对象obj类型
    const result: { [key: string]: any } = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
      let val = obj[key]
      if (obj.hasOwnProperty(key)) {
        //如果子值也是数组或obj对象，执行递归
        if (isObjOrArray(val)) {
          result[key] = deepCopy(val)
        } else {
          result[key] = val
        }
      }
    }
    return result
  }

  //test
  const obj = {
    a: { s: '2' }, b: 2, c: new Date(),
    d: null, e: undefined, f: /abc/g,
    aa: { bb: null, c: new Date() },
    g: [1, 2, 3], h: 'hello'
  }
  const obj2 = deepCopy(obj)
  obj2.a.s = '3'
  console.log(obj)
  console.log(obj2)

}
