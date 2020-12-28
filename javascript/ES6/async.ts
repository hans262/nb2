/**
 * async
 * 标注函数，让函数具有异步等待的功能。
 * 该函数返回值，也是一个promise
 */

namespace Test {
  const p = function (x: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        x > 0 ? resolve(x) : reject('不能为负')
      }, 1000)
    })
  }
  const rr = async () => {
    const r1 = await p(10)
    console.log(r1)
    const r2 = await p(-5)
    console.log(r2)
  }

  rr().catch(err => {
    console.log(err)
  })
}