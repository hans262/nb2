"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
function MD5(data) {
    var hash = crypto_1.createHash('md5');
    hash.update(data);
    return hash.digest('hex');
}
exports.MD5 = MD5;
function Hmac(data, key) {
    const hmac = crypto_1.createHmac('md5', key);
    hmac.update(data);
    return hmac.digest('hex');
}
exports.Hmac = Hmac;
function Cipher(data, key, iv) {
    const cipher = crypto_1.createCipheriv('aes-128-cbc', key, iv);
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
exports.Cipher = Cipher;
function Decipher(data, key, iv) {
    const decipher = crypto_1.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
exports.Decipher = Decipher;
//# sourceMappingURL=encrypt.js.map