/**
 * 交叉类型 -> Intersection Types
 * 
 * 将多个类型合并为一个类型
 * 它包含了所需的所有类型的特性。
 * 应用场景：混入
 * 
 */

namespace TestIntersectionTypes {
  type T1 = {
    name: string
    age: number
  }
  
  type T2 = {
    name: string
    location: string
  }

  type T3 = T1 & T2

  const t3: T3 = {
    name: 'huahua',
    location: 'china',
    age: 18
  }

}