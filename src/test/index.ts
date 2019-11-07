import "reflect-metadata";

export namespace TestMetadata {
  const Controller = (path: string): ClassDecorator => target => {
    Reflect.defineMetadata('controllerPath', path, target)
    Reflect.defineMetadata('controllerName', target.name, target)
  }
  const createMappingDecorator = (method: string) => (path: string): MethodDecorator => (target, key) => {
    const handle = { path, method, methodName: key }
    const handles = Reflect.getMetadata('handles', target.constructor) || []
    handles.push(handle)
    Reflect.defineMetadata('handles', handles, target.constructor)
  }

  const Get = createMappingDecorator('GET')
  const Post = createMappingDecorator('POST')

  @Controller('/testA')
  class TestA {
    @Get('/a')
    someGetMethod() { }
    @Post('/b')
    somePostMethod() { }
  }
  @Controller('/testB')
  class TestB {
    @Get('/a')
    someGetMethod() { }
    @Post('/b')
    somePostMethod() { }
  }
  const combineController = (...arg: (new (...arg: any) => any)[]): Controller[] => arg.map(p => ({
    controllerName: Reflect.getMetadata('controllerName', p),
    controllerPath: Reflect.getMetadata('controllerPath', p),
    controllerHandles: Reflect.getMetadata('handles', p)
  }))

  console.log(combineController(TestA, TestB))


  debugger
  interface Controller {
    controllerPath: string
    controllerName: string
    controllerHandles: {
      path: string,
      method: string,
      methodName: string
    }[]
  }
}