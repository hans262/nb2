"use strict";
var TestNew;
(function (TestNew) {
    class Student {
        constructor() {
            this.name = 'huahua';
            this.age = 18;
        }
    }
    const create = (clazz) => new clazz();
    const stu = create(Student);
    const stu2 = create(Student);
    console.log(stu);
    console.log(stu2);
    debugger;
})(TestNew || (TestNew = {}));
//# sourceMappingURL=new.js.map