"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configure_1 = require("../configure");
const SESSION = new Map();
exports.KEY = 'SESSION_ID';
exports.EXPIRES = configure_1.SESSION_EXPIRES * 60 * 1000;
function generate() {
    const session = {
        id: (Date.now() + Math.random()).toString(),
        expire: Date.now() + exports.EXPIRES,
        count: 0
    };
    SESSION.set(session.id, session);
    return session;
}
exports.generate = generate;
function reset(id) {
    const session = SESSION.get(id);
    if (!session)
        return false;
    SESSION.set(id, {
        ...session,
        expire: Date.now() + exports.EXPIRES,
        count: session.count + 1
    });
    return true;
}
exports.reset = reset;
function remove(id) {
    return SESSION.delete(id);
}
exports.remove = remove;
function select(id) {
    return SESSION.get(id);
}
exports.select = select;
//# sourceMappingURL=Session.js.map