var CONTROLLER = require('../store/CONTROLLER').CONTROLLER;
function CheckController(req, res, next) {
    var method = req.method, relativePath = req.relativePath;
    var Con = CONTROLLER.find(function (v) { return v.PATH === relativePath; });
    if (!Con || !Con.prototype[method])
        return next();
    var r0 = new Con();
    r0[method](req, res);
}
module.exports = CheckController;
//# sourceMappingURL=CheckController.js.map