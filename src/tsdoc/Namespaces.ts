/**
 * 命令空间 -> namespaces
 * 防止命名冲突，组织模块
 * 
 */

namespace TestNamespaces {
  export class User { }
  export const name: string = 'huahua'
  const age: number = 25
  export function getAge(): number {
    return age
  }
}
console.log(TestNamespaces)