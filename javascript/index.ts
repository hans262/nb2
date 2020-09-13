/**
 * 柯里化函数
 * 把函数作为参数传递，上一个函数的返回值作为下一个函数的参数
 * 
 */

namespace Test {
  function compose(...funcs: ((r: any) => any)[]) {
    return funcs.reduce((a, b) => (...arg) => b(a(...arg)))
  }

  function and1(v: number) {
    console.log('+1')
    return v + 1
  }

  function and3(v: number) {
    console.log('+3')
    return v + 3
  }

  function minus2(v: number) {
    console.log('-2')
    return v - 2
  }

  const result = compose(minus2, and1, and3)(2)
  console.log(result)
  
}