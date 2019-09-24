/**
 * 类型守护 -> typeof | instanceof
 * 运行时检查，以确保在某个作用域里的类型
 * 一旦检查过类型，就能在之后的每个分支里清楚地知道类型
 */

function ttt(mok: any) {
  if (typeof mok === 'number') {
    //此处mok是number
    mok
  } else if (mok instanceof Date) {
    //此处mok是Date
    mok
  }
}

/**
 * 类型谓词 -> n is Type
 * 作用：自定义类型守护
 */

function isDate(d: any): d is Date {
  return d instanceof Date
}
function www(mok: any) {
  if (isDate(mok)) {
    //此处mok是Date类型
    mok
  }
}

/**
 * in运算符 ->
 * 
 */

interface Bird {
  fly(): void
}

interface Fish {
  swim(): void
}

function move(pet: Fish | Bird) {
  if ('swim' in pet) {
    return pet.swim()
  }
  return pet.fly()
}