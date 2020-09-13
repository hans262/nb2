/**
 * Object.getOwnPropertyDescriptors<T>(o: T): {[P in keyof T]: TypedPropertyDescriptor<T[P]>} & { [x: string]: PropertyDescriptor };
 * 返回指定对象上一个自有属性对应的属性描述符
 * 
 */

namespace Test {
  const obj = { name: 'ww', age: 18 }
  console.log(Object.getOwnPropertyDescriptors(obj))

}