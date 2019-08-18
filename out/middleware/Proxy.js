"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxy = (req, res, next) => {
    const { method, __relativePath } = req;
    console.log(__relativePath);
    res.end('sss');
};
//# sourceMappingURL=Proxy.js.map