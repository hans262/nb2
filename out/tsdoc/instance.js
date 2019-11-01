"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestInstance;
(function (TestInstance) {
    const singleton = Symbol('instance');
    class Hor {
        constructor() {
            this.loc = 'sic';
        }
        static get instance() {
            if (!this[singleton]) {
                this[singleton] = new Hor();
            }
            return this[singleton];
        }
        byk() { }
    }
    console.log(Hor.instance);
    debugger;
})(TestInstance = exports.TestInstance || (exports.TestInstance = {}));
//# sourceMappingURL=instance.js.map