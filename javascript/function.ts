/**
 * Function 函数
 * 
 * 属性 ->
 * name 返回函数名字的字符串
 * constructor 函数的构造函数
 * prototype
 * 
 * 方法 ->
 * Function.prototype.call<T, A extends any[], R>(
 * this: (this: T, ...args: A) => R, thisArg: T, ...args: A): R;
 * 使用一个指定的this值和单独给出的一个或多个参数来调用一个函数
 * 返回值为调用函数的返回值
 * 
 * Function.prototype.apply<T, A extends any[], R>(
 * this: (this: T, ...args: A) => R, thisArg: T, args: A): R;
 * 跟call方法功能一样，传参形式变成数组
 * 
 * Function.prototype.bind<T, A0, A extends any[], R>(
 * this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0
 * ): (...args: A) => R;
 * 创建一个新的函数，功能跟call函数一样
 * 
 */

namespace Test {
  function fn(this: any, name: string) {
    this.name = name
    console.log(this)
  }
  
  const obj = { a: 1, b: 2 }
  const a = fn.call(obj, '1')
  const b = fn.apply(obj, ['2'])
  const c = fn.bind(obj, '3')
  c()

  console.log(fn.constructor === Function)
  console.log(fn.prototype)
  
}