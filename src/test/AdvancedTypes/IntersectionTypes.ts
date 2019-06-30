/**
 * 交叉类型 -> Intersection Types
 * 
 * 交叉类型是将多个类型合并为一个类型。 
 * 这让我们可以把现有的多种类型叠加到一起成为一种类型，
 * 它包含了所需的所有类型的特性。
 * 
 * 应用场景：混入
 * 
 */

function mixins<T, U>(first: T, second: U): T & U {
  let result = <T & U>{}
  for (let key in first) {
    (<any>result)[key] = (<any>first)[key]
  }
  for (let key in second) {
    (<any>result)[key] = (<any>second)[key]
  }
  return result
}

const first = {
  name: 'huahua',
  loacation: 'china'
}

const second = {
  name: 'goudan',
  age: 18
}

type T26 = typeof first & typeof second

const myObj: T26 = mixins(
  first, second
)

console.log(myObj.name)