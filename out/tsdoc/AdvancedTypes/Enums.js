"use strict";
var TestEnums;
(function (TestEnums) {
    let Status;
    (function (Status) {
        Status[Status["Ready"] = 0] = "Ready";
        Status[Status["Waiting"] = 1] = "Waiting";
    })(Status || (Status = {}));
    TestEnums.status = Status.Ready;
    let Size;
    (function (Size) {
        Size[Size["L"] = 120] = "L";
        Size[Size["M"] = 110] = "M";
        Size[Size["S"] = 100] = "S";
    })(Size || (Size = {}));
    TestEnums.size = Size.M;
    let Color;
    (function (Color) {
        Color["Red"] = "255, 0, 0";
        Color["Green"] = "0, 255, 0";
        Color["Blue"] = "0, 0, 255";
    })(Color || (Color = {}));
    TestEnums.red = Color.Red;
})(TestEnums || (TestEnums = {}));
//# sourceMappingURL=Enums.js.map