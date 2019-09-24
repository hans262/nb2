/**
 * 泛型类
 * 创建DB的复用例子
 */
class User {
  public username: string
  public password: string
  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}
class Student {
  public name: string
  public age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

class CreateDB<T> {
  public list: Array<T>
  constructor() {
    this.list = []
  }
  insert(value: T) {
    this.list.push(value)
  }
}

const user: User = new User('root', '123456')
const userDb = new CreateDB<User>()
userDb.insert(user)
const userList: Array<User> = userDb.list

const student: Student = new Student('huahua', 18)
const studentDb = new CreateDB<Student>()
studentDb.insert(student)
const studentList: Array<Student> = studentDb.list

debugger