/**
 * 装饰器
 * 作用：扩展类、方法、属性、参数的功能
 * 种类：类装饰器、属性装饰器、方法装饰器、参数装饰器
 * 写法：可传参、不可传参 两种
 * 
 */

//修饰属性
function path(path: String) {
  return function (target: any) {
    target.PATH = path
  }
}
//扩展类
function attr<T extends { new(...args: any[]): {} }>(target: T) {
  return class extends target {
    name = "huahua"
    age = 18
  }
}

@path('/user')
@attr
class Test { }
console.log(Test)
console.log(new Test())
debugger