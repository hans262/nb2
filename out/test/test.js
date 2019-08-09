"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class Mb {
    constructor(path) {
        this.path = path;
    }
}
const Controller = (path) => {
    return (target) => {
        target.path = path;
    };
};
let Ma = class Ma {
    constructor(mb) {
        this.mb = mb;
    }
    test() {
        console.log(this.mb.path);
    }
};
Ma = __decorate([
    Controller('/abc'),
    __metadata("design:paramtypes", [Mb])
], Ma);
const ma = new Ma(new Mb('/apb'));
console.log(ma);
const methodsNames = Object.getOwnPropertyNames(Ma.prototype);
console.log(methodsNames);
debugger;
//# sourceMappingURL=test.js.map