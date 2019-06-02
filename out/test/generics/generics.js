function createArray(length, value) {
    const result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
class CreateArray {
    constructor(length, value) {
        this.result = [];
        for (let i = 0; i < length; i++) {
            this.result.push(value);
        }
    }
    getResult() {
        return this.result;
    }
}
//# sourceMappingURL=generics.js.map