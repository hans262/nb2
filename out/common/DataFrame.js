"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function decodeDataFrame(e) {
    let i = 0, j, PayloadData, MaskingKey;
    const FIN = e[i] >> 7;
    const Opcode = e[i++] & 0b00001111;
    const Mask = e[i] >> 7;
    let PayloadLength = e[i++] & 0b01111111;
    if (PayloadLength === 126) {
        PayloadLength = (e[i++] << 8) + e[i++];
    }
    else if (PayloadLength === 127) {
        i += 4;
        let a = (e[i++] << 24) + (e[i++] << 16) + (e[i++] << 8) + e[i++];
        PayloadLength = a;
    }
    if (Mask) {
        MaskingKey = [e[i++], e[i++], e[i++], e[i++]];
        PayloadData = Buffer.allocUnsafe(PayloadLength);
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
    let s = [], d = e.PayloadData, l = d.byteLength;
    s.push((e.FIN << 7) + e.Opcode);
    if (l < 126)
        s.push(l);
    else if (l < 0x10000)
        s.push(126, l >> 8, l & 0b11111111);
    else
        s.push(127, 0, 0, 0, 0, (l & 0xFF000000) >> 24, (l & 0xFF0000) >> 16, (l & 0xFF00) >> 8, l & 0xFF);
    return Buffer.concat([Buffer.from(s), d]);
}
exports.encodeDataFrame = encodeDataFrame;
//# sourceMappingURL=DataFrame.js.map