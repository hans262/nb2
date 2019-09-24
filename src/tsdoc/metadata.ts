/**
 * import "reflect-metadata";
 * 
 * 元数据 是无侵入式的，为类附加一些信息
 * 通过装饰器，为类定义元数据
 * 然后整合类的时候，可以抽出它们的元数据
 * 
 * 目前阶段依赖 reflect-metadata 库来实现
 * 
 * 反射 ->
 * 获取到类有哪些方法名，属性名。
 * 可以用元数据来实现。
 * 
 */

/*
  class Test {
    size: string
    constructor(size: string) {
      this.size = size
    }
    getSize(): string {
      return this.size
    }
    say() { }
  }

  const test = new Test('XL')
  //获取类方法
  console.log(Object.getOwnPropertyNames(Test.prototype))
  //判断类属性
  console.log(test.hasOwnProperty('size'))
  debugger
*/

/*

const Controller = (path: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  }
}

const METHOD_METADATA = 'method'
const PATH_METADATA = 'path'

const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
  return (target, key, descriptor: any) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value)
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value)
  }
}
const Get = createMappingDecorator('GET')
const Post = createMappingDecorator('POST')

@Controller('/test')

class SomeClass {
  @Get('/a')
  someGetMethod() { }
  @Post('/b')
  somePostMethod() { }
}

function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance)

  // 筛选出类的 methodName
  const methodsNames = Object.getOwnPropertyNames(prototype).filter(
    item => item !== 'constructor'
  )

  return methodsNames.map(methodName => {
    const fn = prototype[methodName]

    // 取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn)
    const method = Reflect.getMetadata(METHOD_METADATA, fn)
    return {
      route,
      method,
      fn,
      methodName
    }
  })
}

Reflect.getMetadata(PATH_METADATA, SomeClass)
const rr = mapRoute(new SomeClass())
console.log(rr)

*/