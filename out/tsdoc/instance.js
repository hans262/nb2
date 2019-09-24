"use strict";
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
//# sourceMappingURL=instance.js.map