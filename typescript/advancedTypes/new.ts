/**
 * 类类型 -> new
 * 用来描述类的构造函数的类型
 * 
 */

namespace TestNew {
  type Clazz<P> = new (...arg: any[]) => P
  class Student {
    name: string = 'huahua'
    age: number = 18
  }

  const create = <T>(clazz: Clazz<T>): T => new clazz()
  const stu = create<Student>(Student)
  const stu2 = create<Student>(Student)
  console.log(stu)
  console.log(stu2)
  debugger
}
