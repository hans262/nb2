"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function encodeBase64(arg) {
    return Buffer.from(arg).toString('base64');
}
exports.encodeBase64 = encodeBase64;
function decodeBase64(arg) {
    return Buffer.from(arg, 'base64').toString();
}
exports.decodeBase64 = decodeBase64;
//# sourceMappingURL=base64.js.map