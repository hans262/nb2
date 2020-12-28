/**
 * Array.prototype.sort(compareFn?: (a: T, b: T) => number): this;
 * 
 * < 0 a会在b之前
 * > 0 b会在a之前
 * = 0 相对位置不变
 * 
 */

namespace Test {
  //把4 5 排到最前面
  const t = [7, 5, 1, 4]
  t.sort((a, b) => {
    if (a === 4 || a === 5) {
      return -1
    }
    return 1
  })
  console.log(t)
  
}