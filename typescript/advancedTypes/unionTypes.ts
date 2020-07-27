/**
 * 联合类型 -> Union Types
 * 取值可以为多种类型中的一种
 */

namespace TestUnionTypes {
  function getLength(arg: string | any[]): number {
    return arg.length
  }

  export function main() {
    console.log(getLength('hello'))
    console.log(getLength([1, 2, 3]))
  }
}

TestUnionTypes.main()
