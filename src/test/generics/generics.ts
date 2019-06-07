/**
 * 泛型 ->
 * 含义：支持多种类型的功能模块，在运行时指定类型
 * 
 * 误区：泛型不是拥有多种类型，而是强调类型不确定，具体类型由模块运行时决定
 * 用途：提升代码的可复用性
 */

//泛型接口
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>
}

//泛型函数
let createArray: CreateArrayFunc
createArray = function <T>(length: number, value: T): Array<T> {
  const result: Array<T> = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
const stringArrray: Array<string> = createArray<string>(3, 'hello')
const numberArray: Array<number> = createArray<number>(3, 123)

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
const strArrary: Array<string> = new CreateArray<string>(3, 'hello').getResult()
const numArrary: Array<number> = new CreateArray<number>(3, 123).getResult()