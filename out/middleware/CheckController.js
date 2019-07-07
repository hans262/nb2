"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../controller");
exports.CheckController = function (req, res, next) {
    const { method, __relativePath } = req;
    if (!method)
        return next();
    const controller = controller_1.default.find(c => c.PATH_NAME === __relativePath);
    if (!controller || !controller[method])
        return next();
    controller[method](req, res);
};
//# sourceMappingURL=CheckController.js.map