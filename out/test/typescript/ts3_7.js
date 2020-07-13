"use strict";
var Ts3_7;
(function (Ts3_7) {
    const teacher = {
        subject: ['Chemistry', 'History'],
        contact: {
            location: 'Washington'
        }
    };
    const email = teacher.contact?.email ?? 'hetong@hu123.ck';
    console.log(email);
    function assertIsDefined(val) {
        if (val === undefined || val === null) {
            throw new Error(`Expected 'val' to be defined, but received ${val}`);
        }
    }
    assertIsDefined(123);
    function assertIsString(val) {
        if (typeof val !== "string") {
            throw new Error('Not of string');
        }
    }
    assertIsString('hello');
    function assert(val, msg) {
        if (!val)
            throw new Error(msg);
        console.log('pass');
    }
    assert(null, 'val of undefined or null');
})(Ts3_7 || (Ts3_7 = {}));
//# sourceMappingURL=ts3_7.js.map