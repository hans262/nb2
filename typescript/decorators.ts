/**
 * 装饰器 -> Decorators
 * 作用：扩展类、方法、属性、参数的功能
 * 种类：类装饰器、属性装饰器、方法装饰器、参数装饰器
 * 写法：可传参、不可传参 两种
 * 
 * 执行顺序：从下往上
 */

namespace TestDecorators {
  const path = (p: string) => (target: any) => {
    target.PATH = p
  }
  const attr = (props: { [key: string]: any }) => (target: any) => {
    Object.entries(props).forEach(v => {
      target.prototype[v[0]] = v[1]
    })
  }

  @attr({
    aaa: 'aaa',
    bbb: 'bbb'
  })
  @path('/api/user')
  class Test {
    ccc = 'ccc'
    say() {
      console.log((this as any).aaa)
    }
  }

  console.log(Test)
  const t: any = new Test()
  t.say()
  debugger
}