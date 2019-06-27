/**
 * 类类型 -> new
 * 
 */

function create<T>(c: { new(): T; }): T {
  return new c()
}

class AA {
  name: string = 'huahua'
}
const BB = create(AA)
console.log(BB)
debugger