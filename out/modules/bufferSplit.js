"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bufferSplit(buffer, spl) {
    const result = [];
    let offset = 0;
    let index = 0;
    while ((index = buffer.indexOf(spl, offset)) !== -1) {
        result.push(buffer.slice(offset, index));
        offset = index + spl.length;
    }
    result.push(buffer.slice(offset));
    return result.filter(b => b.byteLength);
}
exports.bufferSplit = bufferSplit;
//# sourceMappingURL=bufferSplit.js.map