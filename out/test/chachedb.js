"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CacheDb {
    constructor() {
        this.store = {
            token: new Map()
        };
        this.EXPIRES = 20 * 60 * 1000;
    }
    ADD_TOKEN() {
        const t = {
            id: (Date.now() + Math.random()).toString(),
            expire: Date.now() + this.EXPIRES,
            count: 0
        };
        this.store.token.set(t.id, t);
    }
    DELETE_TOKEN(id) {
        return this.store.token.delete(id);
    }
    UPDATE_TOKEN(id) {
        const token = this.store.token.get(id);
        if (!token)
            return false;
        this.store.token.set(id, {
            ...token,
            expire: Date.now() + this.EXPIRES,
            count: token.count + 1
        });
        return true;
    }
    SELETE_TOKEN(id) {
        return this.store.token.get(id);
    }
}
exports.CacheDb = CacheDb;
//# sourceMappingURL=chachedb.js.map