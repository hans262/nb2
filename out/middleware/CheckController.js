"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = require("../conf");
const controller_1 = require("../controller");
exports.CheckController = function (req, res, next) {
    const { method, __relativePath } = req;
    if (!method || !__relativePath)
        return next();
    const prefix = __relativePath.match(new RegExp('^' + conf_1.API_PREFIX + '/'));
    if (!prefix)
        return next();
    const controller = controller_1.default.find(c => {
        const def = c.PATH_NAME === __relativePath;
        const m0 = c.PATH_NAME.match(/^([^\*]+)\/\*$/);
        if (!m0)
            return def;
        const m1 = __relativePath.match(new RegExp('^' + m0[1] + '.+$'));
        return m1 ? true : def;
    });
    if (!controller || !controller[method])
        return next();
    controller[method](req, res);
};
//# sourceMappingURL=CheckController.js.map