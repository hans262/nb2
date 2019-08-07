interface MokF {
  PATH: string
  GET?(): void
  POST?(): void
}

class Mok implements MokF {
  PATH: string = '/apc'
  GET(): void { }
}

class Cok implements MokF {
  PATH: string = '/abc'
  POST(): void { }
}

function gen<T>(...clazz: { new(): T }[]): T[] {
  return clazz.map<T>(c => {
    //我要拿到c上的方法名
    return new c()
  })
}

const list = gen<MokF>(
  Mok,
  Cok
)

console.log(list)
debugger