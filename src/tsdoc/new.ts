/**
 * 类类型 -> new
 */

type Clazz<P> = new () => P
class C2 {
  name: string = 'huahua'
  age: number = 18
  study(): void { }
}

const create = <T>(clazz: Clazz<T>): T => new clazz()
const c2 = create<C2>(C2)

console.log(c2)
debugger