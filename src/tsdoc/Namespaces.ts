/**
 * 命令空间 -> Namespaces
 * 
 * 防止命名冲突，组织模块
 * 类似与js的自执行匿名函数 ;(function(){})()
 */

export namespace MySpace {
  export class User { }
  export const name: string = 'huahua'
  const age: number = 25
  export function getAge(): number {
    return age
  }
}
console.log(MySpace)