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
class DB {
    constructor() {
        this.list = [];
    }
    insert(value) {
        this.list.push(value);
    }
}
const user = new User('root', '123456');
const userDb = new DB();
userDb.insert(user);
console.log(userDb.list);
const student = new Student('huahua', 18);
const studentDb = new DB();
studentDb.insert(student);
console.log(studentDb.list);
debugger;
//# sourceMappingURL=generics2.js.map