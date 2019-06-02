//断言
function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}
const len:number = getLength('dwqdqw')
console.log(len)


/**
 * const 断言
 * 让对象变成只读
 */
// const x={ text: 'hello' } as const
// let y = 25 as const