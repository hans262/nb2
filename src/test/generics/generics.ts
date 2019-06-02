/**
 * 泛型
 * 支持多种类型的函数
 * 在运行时指定类型
 * 
 * 误区：泛型不是拥有多种类型，而是强调类型不确定，具体类型由函数运行决定
 * 作用：提升代码的可复用性
 */

//泛型函数
function createArray<T>(length: number, value: T): Array<T> {
  const result: Array<T> = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
// const stringArrray: Array<string> = createArray<string>(3, 'hello')
// const numberArray: Array<number> = createArray<number>(3, 123)

//泛型类
class CreateArray<T>{
  public result: Array<T> = []
  constructor(length: number, value: T) {
    for (let i = 0; i < length; i++) {
      this.result.push(value)
    }
  }
  getResult(): Array<T> {
    return this.result
  }
}
// console.log(new CreateArray<string>(3, 'hello').getResult())
// console.log(new CreateArray<number>(3, 123).getResult())

//泛型接口
interface Config {
  <T>(value: T): T
}

