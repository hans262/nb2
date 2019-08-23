"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function decodeDataFrame(e) {
    let i = 0, j = 0, PayloadData, MaskingKey;
    const FIN = e[i] >> 7;
    const Opcode = e[i++] & 0b00001111;
    const Mask = e[i] >> 7;
    let PayloadLength = e[i++] & 0b01111111;
    console.log(PayloadLength);
    if (PayloadLength == 126) {
        PayloadLength = (e[i++] << 8) + e[i++];
    }
    else if (PayloadLength == 127) {
        i += 4;
        PayloadLength = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++];
    }
    if (Mask) {
        MaskingKey = [e[i++], e[i++], e[i++], e[i++]];
        PayloadData = Buffer.alloc(PayloadLength);
        for (j = 0; j < PayloadLength; j++) {
            PayloadData[j] = e[i + j] ^ MaskingKey[j % 4];
        }
    }
    else {
        PayloadData = e.slice(i, i + PayloadLength);
    }
    return { FIN, Opcode, Mask, MaskingKey, PayloadData, PayloadLength };
}
exports.decodeDataFrame = decodeDataFrame;
function encodeDataFrame(e) {
    let s = [], o = e.PayloadData, l = o.byteLength;
    s.push((e.FIN << 7) + e.Opcode);
    if (l < 126)
        s.push(l);
    else if (l < 0x10000)
        s.push(126, l >> 8, l & 0b11111111);
    else
        s.push(127, 0, 0, 0, 0, (l & 0xFF000000) >> 6, (l & 0xFF0000) >> 4, (l & 0xFF00) >> 2, l & 0xFF);
    return Buffer.concat([Buffer.from(s), o]);
}
exports.encodeDataFrame = encodeDataFrame;
//# sourceMappingURL=DataFrame.js.map