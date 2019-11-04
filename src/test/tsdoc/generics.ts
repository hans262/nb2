/**
 * 泛型 -> Generics
 * 含义：支持多种类型的功能模块，在运行时指定类型
 * 把类型当做参数来传递的函数，可拥有多个泛型参数
 * 
 * 误区：泛型不是拥有多种类型，而是强调类型不确定，具体类型由模块运行时决定
 * 用途：提升代码的可复用性
 * 
 */

namespace TestGenerics {
  //泛型接口
  interface Props<T> { type: Array<T> }
  const K1: Props<string> = { type: ['1', '2', '3'] }

  //泛型函数
  type CreateArrayFunc = <T>(length: number, value: T) => Array<T>
  const createArray: CreateArrayFunc = <T>(length: number, value: T): Array<T> => {
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

  //多参数泛型 交换元组顺序例子
  function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
  }
  const result: [string, number] = swap([7, 'seven'])
}
