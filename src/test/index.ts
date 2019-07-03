/**
 * 类型保护 -> typeof | instanceof
 * 运行时检查，以确保在某个作用域里的类型
 * 一旦检查过类型，就能在之后的每个分支里清楚地知道类型
 * 返回值是：类型谓词
 * 
 */

function isNumber(x: any): x is number {
  return typeof x === 'number'
}
console.log(isNumber(123))

function isDate(obj: any): obj is Date {
  return obj instanceof Date
}
console.log(isDate(new Date()))