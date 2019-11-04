/**
 * 依赖注入 DI ->
 * 通过A的构造函数将B的实例注入，这个过程叫依赖注入。
 * 
 * 控制反转 IoC ->
 * 类A依赖类B，但A不控制B的创建和销毁，仅使用B。
 * 那么B的控制权则交给A之外处理，这叫控制反转（IOC）。
 * 
 * IOC Container容器 ->
 * 将B的实例注入到A的构造函数中的这个过程是我们手动操作的，
 * 比较麻烦，特别是当类的关系变多变复杂时，这种方式显得很难维护。
 * IOC容器负责管理对象的生命周期、依赖关系等，
 * 实现对象的依赖查找以及依赖注入。
 * 
 */

namespace TestIoc {
  class Engine {
    public make: string = '本田发动机'
  }
  class Tires {
    public make: string = '法国米其林'
  }
  class Service {
    public count: number = 0
    add() {
      this.count += 1
    }
    getCount() {
      return this.count
    }
  }
  class Car {
    public make: string = '冠道'
    constructor(
      public engine: Engine,
      public tires: Tires,
      public service: Service
    ) {
      this.service.add()
    }
    drive() {
      console.log(`你正在驾驶本田${this.make}`)
    }
  }

  //主程序
  function main() {
    const service = new Service()

    const car1 = new Car(new Engine(), new Tires(), service)
    const car2 = new Car(new Engine(), new Tires(), service)
    const count = service.getCount()
    console.log(count)
    car2.drive()
  }
  main()
}
