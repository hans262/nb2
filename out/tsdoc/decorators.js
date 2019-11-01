"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TestDecorators;
(function (TestDecorators) {
    const path = (p) => (target) => {
        target.PATH = p;
    };
    const attr = (props) => (target) => {
        Object.entries(props).forEach(v => {
            target.prototype[v[0]] = v[1];
        });
    };
    let Test = class Test {
        constructor() {
            this.ccc = 'ccc';
        }
        say() {
            console.log(this.aaa);
        }
    };
    Test = __decorate([
        attr({
            aaa: 'aaa',
            bbb: 'bbb'
        }),
        path('/api/user')
    ], Test);
    console.log(Test);
    const t = new Test();
    t.say();
    debugger;
})(TestDecorators || (TestDecorators = {}));
//# sourceMappingURL=decorators.js.map