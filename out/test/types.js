const array = [125, 'hello', true];
const object = { name: 'huahua' };
const myArray = [123, 'hello'];
var Status;
(function (Status) {
    Status[Status["Ready"] = 0] = "Ready";
    Status[Status["Waiting"] = 1] = "Waiting";
})(Status || (Status = {}));
const myStatus = Status.Ready;
var Size;
(function (Size) {
    Size[Size["L"] = 120] = "L";
    Size[Size["M"] = 110] = "M";
    Size[Size["S"] = 100] = "S";
})(Size || (Size = {}));
const size = Size.M;
const Person = ['huahua', 18];
const testA = [1, 2, 3];
const testB = [2, 'hello'];
//# sourceMappingURL=types.js.map