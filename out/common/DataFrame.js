"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function decodeDataFrame(e) {
    let i = 0, j, s;
    const frame = {
        FIN: e[i] >> 7,
        Opcode: e[i++] & 15,
        Mask: e[i] >> 7,
        PayloadLength: e[i++] & 0x7F,
        PayloadData: ''
    };
    if (frame.PayloadLength == 126) {
        frame.PayloadLength = (e[i++] << 8) + e[i++];
    }
    else if (frame.PayloadLength == 127) {
        i += 4;
        frame.PayloadLength = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++];
    }
    if (frame.Mask) {
        frame.MaskingKey = [e[i++], e[i++], e[i++], e[i++]];
        s = Buffer.alloc(frame.PayloadLength);
        for (j = 0; j < frame.PayloadLength; j++) {
            s[j] = e[i + j] ^ frame.MaskingKey[j % 4];
        }
    }
    else {
        s = e.slice(i, i + frame.PayloadLength);
    }
    frame.PayloadData = s.toString();
    return frame;
}
exports.decodeDataFrame = decodeDataFrame;
function encodeDataFrame(e) {
    let s = [], o = Buffer.from(e.PayloadData, 'binary'), l = o.byteLength;
    s.push((e.FIN << 7) + e.Opcode);
    if (l < 126)
        s.push(l);
    else if (l < 0x10000)
        s.push(126, (l & 0xFF00) >> 2, l & 0xFF);
    else
        s.push(127, 0, 0, 0, 0, (l & 0xFF000000) >> 6, (l & 0xFF0000) >> 4, (l & 0xFF00) >> 2, l & 0xFF);
    return Buffer.concat([Buffer.from(s), o]);
}
exports.encodeDataFrame = encodeDataFrame;
//# sourceMappingURL=DataFrame.js.map