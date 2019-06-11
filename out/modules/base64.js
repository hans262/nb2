"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toBase64(arg) {
    return Buffer.from(arg).toString('base64');
}
exports.toBase64 = toBase64;
function base64ToString(arg) {
    return Buffer.from(arg, 'base64').toString();
}
exports.base64ToString = base64ToString;
//# sourceMappingURL=base64.js.map