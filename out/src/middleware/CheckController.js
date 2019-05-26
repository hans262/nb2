"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CONTROLLER_1 = require("../store/CONTROLLER");
function CheckController(req, res, next) {
    var method = req.method, relativePath = req.relativePath;
    var Con = CONTROLLER_1.CONTROLLER.find(function (v) { return v.PATH === relativePath; });
    if (!Con || !Con.prototype[method])
        return next();
    var r0 = new Con();
    r0[method](req, res);
}
module.exports = CheckController;
//# sourceMappingURL=CheckController.js.map