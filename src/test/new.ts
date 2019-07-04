/**
 * 类类型 -> new
 */

function create<T>(c: { new(): T; }): T {
  return new c()
}
class HuaHua {
  name: string = 'huahua'
  age: number = 18
  study(): void { }
}
const huahua: HuaHua = create<HuaHua>(HuaHua)
console.log(huahua)
debugger