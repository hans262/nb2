const crypto=require('crypto')

class Encrypt{
	constructor(){}
	MD5(data){
		var hash=crypto.createHash('md5')
		hash.update(data)
		return hash.digest('hex')
	}
	Hmac(data){
		const hmac=crypto.createHmac('md5', 'secret-key')
		hmac.update(data)
		return hmac.digest('hex')
	}
	AESencrypt(data,key){
		const cipher=crypto.createCipher('aes-128-ecb',key)
		var crypted=cipher.update(data,'utf8','hex')
		crypted+=cipher.final('hex')
		return crypted
	}
	AESdecrypt(encrypted,key){
		const decipher=crypto.createDecipher('aes-128-ecb', key)
	    var decrypted=decipher.update(encrypted,'hex','utf8')
	    decrypted+=decipher.final('utf8')
	    return decrypted
	}
}

const encrypt=new Encrypt()
module.exports=encrypt

/*

AES  对称加密解密  安全级别--->
算法 aes192 aes-128-ecb aes-256-cbc

MD5  哈希加密  安全级别--->
算法 md5 sha1 sha256 sha512 

Hmac  哈希加密 安全级别--->
算法 md5 sha1 sha256 sha512 

*/









