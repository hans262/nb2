/**
 * 类型守卫 -> Type Guards
 * 
 * 运行时检查，以确保在某个作用域里的类型
 * 一旦检查过类型，就能在之后的每个分支里清楚地知道类型
 */

namespace TestTypeGuards {
  let mok:any

  //typeof 守卫
  if(typeof mok === 'number') {
    mok
  }
  //instanceof 守卫
  if(mok instanceof Date) {
    mok.toLocaleDateString()
  }
}
