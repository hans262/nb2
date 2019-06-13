"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseRange(range, size) {
    const matched = range.match(/^bytes=(\d+)-(\d+)$/);
    if (!matched)
        return null;
    const start = parseInt(matched[1]);
    const end = parseInt(matched[2]);
    if (start > end)
        return null;
    if (end >= size)
        return null;
    return { start, end };
}
exports.parseRange = parseRange;
//# sourceMappingURL=parseRange.js.map