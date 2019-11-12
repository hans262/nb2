"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
var Ts3_7;
(function (Ts3_7) {
    var _a, _b;
    const album = {
        title: 'ww',
    };
    const artistBio = (_b = (_a = album.artist) === null || _a === void 0 ? void 0 : _a.bio, (_b !== null && _b !== void 0 ? _b : 'hag'));
    console.log(artistBio);
    function assertIsDefined(val) {
        if (val === undefined || val === null) {
            throw new assert_1.AssertionError({ message: `Expected 'val' to be defined, but received ${val}` });
        }
    }
    assertIsDefined(undefined);
    function assertIsString(val) {
        if (typeof val !== "string") {
            throw new assert_1.AssertionError({ message: 'Not a string!' });
        }
    }
    assertIsString('abc');
    function assert(condition, msg) {
        if (!condition) {
            throw new assert_1.AssertionError({ message: msg });
        }
    }
    assert(null, 'val is undefined');
})(Ts3_7 || (Ts3_7 = {}));
//# sourceMappingURL=ts3_7.js.map