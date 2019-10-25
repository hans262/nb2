"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test;
(function (Test) {
    class User {
    }
    Test.User = User;
    Test.name = 'huahua';
    const age = 25;
    function getAge() {
        return age;
    }
    Test.getAge = getAge;
})(Test = exports.Test || (exports.Test = {}));
console.log(Test);
//# sourceMappingURL=Namespaces.js.map