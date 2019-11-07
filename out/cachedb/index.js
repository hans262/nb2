"use strict";
class CacheDb {
    constructor() {
        this.db = new Map();
    }
    createToken() {
        this.db.set('token', new Map());
    }
    generateToken() {
        const session = {
            id: (Date.now() + Math.random()).toString(),
            expire: Date.now() + EXPIRES,
            count: 0
        };
        SESSION.set(session.id, session);
    }
}
//# sourceMappingURL=index.js.map