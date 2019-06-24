/**
 * 联合类型 -> Union Types
 * 取值可以为多种类型中的一种
 */

const myArray: Array<string | number> = [123, 'hello']

function demo(arg: string | number): string | number {
  return arg
}