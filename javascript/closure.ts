/**
 * closure 闭包
 * 
 * 绑定了执行环境的函数
 * 外部函数执行完后，闭包依然存在
 * 
 */

namespace Test {
  function init() {
    let a = 0
    return function des() {
      console.log(a++)
    }
  }
  let t = init()
  //这里t函数绑定了init的执行环境，变量a一直存在
  t()
  t()

  console.log('-----------------')
  //这里是闭包的经典案例
  const arr = [1, 2, 3, 4, 5]
  for (var i = 0; i < arr.length; i++) {
    ((i) => {
      setTimeout(() => {
        console.log(arr[i])
      }, 1000 * i)
    })(i)
  }

}