//泛型类
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
    this.name=name
    this.age=age
  }
}

class DB<T> {
  public list: Array<T>
  constructor() {
    this.list = []
  }
  insert(value: T) {
    this.list.push(value)
  }
}

const user: User = new User('root', '123456')
const userDb = new DB<User>()
userDb.insert(user)
console.log(userDb.list)

const student:Student= new Student('huahua',18)
const studentDb=new DB<Student>()
studentDb.insert(student)
console.log(studentDb.list)

debugger