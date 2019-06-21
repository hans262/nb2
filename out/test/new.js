function create(c) {
    return new c();
}
class AA {
    constructor() {
        this.name = 'huahua';
    }
}
const BB = create(AA);
console.log(BB);
debugger;
//# sourceMappingURL=new.js.map