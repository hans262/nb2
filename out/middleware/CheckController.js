"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configure_1 = require("../configure");
const controller_1 = require("../controller");
const Controller_1 = require("../Interface/Controller");
const logger_1 = require("../modules/logger");
exports.CheckController = function (req, res, next) {
    const { method, __relativePath, __absolutePath, __startTime } = req;
    if (!method || !__relativePath)
        return next();
    if (!Controller_1.isMethod(method))
        return next();
    const prefix = __relativePath.match(new RegExp('^' + configure_1.API_PREFIX + '/'));
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
    if (!controller)
        return next();
    let handle = controller[method];
    if (!handle)
        return next();
    handle = handle.bind(controller);
    handle(req, res);
    logger_1.DEBUG({
        type: 'CONTROLLER',
        msg: __absolutePath + ' +' + (Date.now() - __startTime) + 'ms'
    });
};
//# sourceMappingURL=CheckController.js.map