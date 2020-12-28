/**
 * Symbol
 * 独一无二的值
 * 对象属性名不被重写
 * 
 * 一般用作私有唯一属性
 * 对象创建者的属性，不会被对象使用者的自定义属性冲突
 * 
 */

namespace Test {
  const named = Symbol('key')
  type Person = {
    [named]: string
  }
  const person: Person = {
    [named]: 'hh'
  }
  person[named] = 'ww'
  console.log(person)

}