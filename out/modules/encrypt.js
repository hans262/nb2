"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
function MD5(data) {
    var hash = crypto_1.createHash('md5');
    hash.update(data);
    return hash.digest('hex');
}
exports.MD5 = MD5;
function Hmac(data) {
    const hmac = crypto_1.createHmac('md5', 'secret-key');
    hmac.update(data);
    return hmac.digest('hex');
}
exports.Hmac = Hmac;
function Cipher(data, key) {
    const cipher = crypto_1.createCipher('aes-128-ecb', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
exports.Cipher = Cipher;
function Decipher(encrypted, key) {
    const decipher = crypto_1.createDecipher('aes-128-ecb', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
exports.Decipher = Decipher;
/*

AES  对称加密解密  安全级别--->
算法 aes192 aes-128-ecb aes-256-cbc

MD5  哈希加密  安全级别--->
算法 md5 sha1 sha256 sha512

Hmac  哈希加密 安全级别--->
算法 md5 sha1 sha256 sha512

*/ 
//# sourceMappingURL=encrypt.js.map