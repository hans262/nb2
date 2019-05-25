"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conf_1 = require("../conf");
exports.SESSION = {};
exports.KEY = 'SESSION_ID';
exports.EXPIRES = conf_1.SESSION_EXPIRES * 60 * 1000; //20分钟
function generate() {
    var session = {
        id: Date.now() + Math.random(),
        expire: Date.now() + exports.EXPIRES,
        count: 0
    };
    exports.SESSION[session.id] = session;
    return session;
}
exports.generate = generate;
function reset(id) {
    var session = exports.SESSION[id];
    session.expire = Date.now() + exports.EXPIRES;
    session.count++;
}
exports.reset = reset;
function remove(id) {
    delete exports.SESSION[id];
}
exports.remove = remove;
function select(id) {
    return exports.SESSION[id];
}
exports.select = select;
//# sourceMappingURL=SESSION.js.map