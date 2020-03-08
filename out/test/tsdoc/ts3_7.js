"use strict";
var Ts3_7;
(function (Ts3_7) {
    var _a, _b;
    const teacher = {
        subject: ['Chemistry', 'History'],
        contact: {
            location: 'Washington'
        }
    };
    const email = (_b = (_a = teacher.contact) === null || _a === void 0 ? void 0 : _a.email, (_b !== null && _b !== void 0 ? _b : 'hetong@hu123.ck'));
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