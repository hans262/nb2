"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var path_2 = require("../utils/path");
exports.CONTROLLER = [];
function useController(controller) {
    exports.CONTROLLER.push(controller);
}
try {
    var files = fs_1.readdirSync(path_2.CONTROLLER_PATH);
    files.forEach(function (f) {
        Promise.resolve().then(function () { return require(path_1.join(path_2.CONTROLLER_PATH, f)); }).then(function (c) {
            useController(c);
        });
    });
}
catch (error) {
    console.error(error);
}
//# sourceMappingURL=CONTROLLER.js.map