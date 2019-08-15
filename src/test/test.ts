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