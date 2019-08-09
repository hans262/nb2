/**
 * 类A依赖类B，但A不控制B的创建和销毁，仅使用B，
 * 那么B的控制权则交给A之外处理，这叫控制反转（IOC）。
 * 
 * 通过A的构造函数将B的实例注入，这个过程叫依赖注入
 * 
 * 
 * 那么什么是IOC Container（容器）？
 * 
 * 
 */

class Mb {
  path: string
  constructor(path: string) {
    this.path = path
  }
}

const Controller = (path: string): ClassDecorator => {
  return (target: any) => {
    target.path = path
  }
}

@Controller('/abc')
class Ma {
  // private eoo: number = 25
  constructor(public readonly mb: Mb) { }
  test() {
    console.log(this.mb.path)
  }
}

const ma = new Ma(new Mb('/apb'))
console.log(ma)

// 筛选出mehtod name
const methodsNames = Object.getOwnPropertyNames(Ma.prototype)
console.log(methodsNames)
debugger