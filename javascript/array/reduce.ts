/**
 * Array.prototype.reduce<U>(
 *  callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
 *  initialValue: U
 * ): U;
 * 
 * 接收一个函数作为累加器
 * 
 * pre 上次的值
 * cur 当前值
 * curIndex 当前值索引
 * arr 当前数组
 * initialValue 初始值
 * 
 */

namespace Test {
  //求交集
  const a = [1, 2, 3, 4, 'a']
  const b = [6, 5, 4, 3, 'a']
  const c = a.concat(b).sort().reduce<(string | number)[]>(
    (pre, cur, index, arr) =>
      index > 0 && cur === arr[index - 1] ? [...pre, cur] : pre
    , []
  )
  console.log(c)
}
