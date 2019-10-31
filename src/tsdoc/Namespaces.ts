/**
 * 命令空间 -> Namespaces
 * 防止命名冲突，组织模块
 * 
 */

export namespace Test {
  export class User { }
  export const name: string = 'huahua'
  const age: number = 25
  export function getAge(): number {
    return age
  }
}
console.log(Test)