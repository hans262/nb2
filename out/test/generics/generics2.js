class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class CreateDB {
    constructor() {
        this.list = [];
    }
    insert(value) {
        this.list.push(value);
    }
}
const user = new User('root', '123456');
const userDb = new CreateDB();
userDb.insert(user);
const userList = userDb.list;
const student = new Student('huahua', 18);
const studentDb = new CreateDB();
studentDb.insert(student);
const studentList = studentDb.list;
debugger;
//# sourceMappingURL=generics2.js.map