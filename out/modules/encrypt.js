"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
function Hash(data) {
    return crypto_1.createHash('md5').update(data).digest('hex');
}
exports.Hash = Hash;
function Hmac(data, key) {
    return crypto_1.createHmac('md5', key).update(data).digest('hex');
}
exports.Hmac = Hmac;
function Cipheriv(data, key, iv) {
    const cipher = crypto_1.createCipheriv('aes-128-cbc', key, iv);
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
exports.Cipheriv = Cipheriv;
function Decipheriv(data, key, iv) {
    const decipher = crypto_1.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
exports.Decipheriv = Decipheriv;
//# sourceMappingURL=encrypt.js.map