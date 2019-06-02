const array = [125, 'dwq', true];
const object = { name: 'huahua' };
const myType = [123, 'hello', false];
var Status;
(function (Status) {
    Status[Status["Ready"] = 0] = "Ready";
    Status[Status["Waiting"] = 1] = "Waiting";
})(Status || (Status = {}));
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Blue"] = 1] = "Blue";
    Color[Color["Green"] = 2] = "Green";
})(Color || (Color = {}));
var Size;
(function (Size) {
    Size[Size["L"] = 120] = "L";
    Size[Size["M"] = 110] = "M";
    Size[Size["S"] = 100] = "S";
})(Size || (Size = {}));
const myStatus = Status.Ready;
const color = Color.Blue;
const size = Size.M;
const Person = ['huahua', 18];
//# sourceMappingURL=types.js.map