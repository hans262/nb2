"use strict";
var TestNamespaces;
(function (TestNamespaces) {
    class User {
    }
    TestNamespaces.User = User;
    TestNamespaces.name = 'huahua';
    const age = 25;
    function getAge() {
        return age;
    }
    TestNamespaces.getAge = getAge;
})(TestNamespaces || (TestNamespaces = {}));
console.log(TestNamespaces);
//# sourceMappingURL=namespaces.js.map