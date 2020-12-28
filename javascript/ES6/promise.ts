/**
 * Promise 携带结果和异常的对象
 */

namespace Test {
  const p = (x: number) => new Promise((resolve, reject) => {
    setTimeout(() => {
      x > 3 ? resolve(x) : reject(new Error('参数异常'))
    }, 1000)
  })
  /**
   * 继发
   */
  async function testContinue() {
    try {
      const p1 = await p(5)
      console.log(p1)
      const p2 = await p(4)
      console.log(p2)
    } catch (err) {
      console.log(err)
    } finally {
      console.log('done')
    }
  }
  /**
   * 并发
   */
  async function testConcurrent() {
    try {
      let results = await Promise.all([p(4), p(5), p(6)])
      console.log(results)
    } catch (err) {
      console.log(err)
    } finally {
      console.log('done')
    }
  }
  // testContinue()
  testConcurrent()
}
