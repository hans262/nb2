var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function path(path) {
    return function (target) {
        target.PATH = path;
    };
}
function attr(target) {
    return class extends target {
        constructor() {
            super(...arguments);
            this.name = "huahua";
            this.age = 18;
        }
    };
}
let SelectUser = class SelectUser {
};
SelectUser = __decorate([
    path('/api/user'),
    attr
], SelectUser);
console.log(SelectUser);
console.log(new SelectUser());
debugger;
//# sourceMappingURL=decorators.js.map