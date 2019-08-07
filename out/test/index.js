"use strict";
class Mok {
    constructor() {
        this.PATH = '/apc';
    }
    GET() { }
}
class Cok {
    constructor() {
        this.PATH = '/abc';
    }
    POST() { }
}
function gen(...clazz) {
    return clazz.map(c => {
        return new c();
    });
}
const list = gen(Mok, Cok);
console.log(list);
debugger;
//# sourceMappingURL=index.js.map