"use strict";
function create(c) {
    return new c();
}
class HuaHua {
    constructor() {
        this.name = 'huahua';
        this.age = 18;
    }
    study() { }
}
const huahua = create(HuaHua);
console.log(huahua);
debugger;
//# sourceMappingURL=new.js.map