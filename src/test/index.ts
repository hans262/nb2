//装饰器
function Path(path: String) {
  return function (target: any) {
    target.PATH = path
  }
}

function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  }
}

@Path('/user')
@classDecorator
class Test { }
console.log(Test)
console.log(new Test())
debugger