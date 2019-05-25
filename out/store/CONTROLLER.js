"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var join = require('path').join;
var path_1 = require("../utils/path");
exports.CONTROLLER = [];
function useController(controller) {
    exports.CONTROLLER.push(controller);
}
try {
    var files = fs.readdirSync(path_1.CONTROLLER_PATH);
    files.forEach(function (f) {
        var c = require(join(path_1.CONTROLLER_PATH, f));
        useController(c);
    });
}
catch (error) {
    console.error(error);
}
//# sourceMappingURL=CONTROLLER.js.map