/**
 * 装饰器 -> Decorators
 * 作用：扩展类、方法、属性、参数的功能
 * 种类：类装饰器、属性装饰器、方法装饰器、参数装饰器
 * 写法：可传参、不可传参 两种
 * 
 * 执行顺序：从下往上
 */

//扩展静态成员
function path(path: string) {
  return function (target: any) {
    target.PATH = path
  }
}
//扩展成员
function attr<T extends new (...args: any[]) => {}>(target: T): T {
  return class extends target {
    name = "huahua"
    age = 18
  }
}

@path('/api/user')
@attr
class C3 { }
const c3 = new C3()
console.log(c3)
debugger