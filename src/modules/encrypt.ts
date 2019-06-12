import {
	createHash,
	createHmac,
	createCipheriv,
	createDecipheriv,
	CipherKey,
	BinaryLike
} from 'crypto'

/**
 * md5加密 16进制
 * 支持 md5 sha1 sha256 sha512
 * @param data 源
 */
export function MD5(data: BinaryLike): string {
	var hash = createHash('md5')
	hash.update(data)
	return hash.digest('hex')
}

/**
 * md5加密 16进制
 * 支持 md5 sha1 sha256 sha512
 * @param data 源
 * @param key 密钥
 */
export function Hmac(data: BinaryLike, key: BinaryLike): string {
	const hmac = createHmac('md5', key)
	hmac.update(data)
	return hmac.digest('hex')
}

/**
 * aes加密 16进制
 * 支持算法 aes-128-cbc
 * @param data 
 * @param key 
 * @param iv 
 */
export function Cipher(data: string, key: CipherKey, iv: BinaryLike): string {
	const cipher = createCipheriv('aes-128-cbc', key, iv)
	let crypted = cipher.update(data, 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
}

/**
 * aes解密 16进制
 * 支持算法 aes-128-cbc
 * @param data 
 * @param key 
 * @param iv 
 */
export function Decipher(data: string, key: BinaryLike, iv: BinaryLike): string {
	const decipher = createDecipheriv('aes-128-cbc', key, iv)
	let decrypted = decipher.update(data, 'hex', 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted
}

/**
 * 用法
 * const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8');
 * const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8');
 * console.log(Cipher('hello', key, iv))
 * //dd5c27de141494924da6e6db3276de20
 * console.log(Decipher('dd5c27de141494924da6e6db3276de20', key, iv))
 */

/*
	AES  对称加密解密  安全级别--->
	算法 aes192 aes-128-cbc aes-256-cbc

	MD5  哈希加密  安全级别--->
	算法 md5 sha1 sha256 sha512

	Hmac  哈希加密 安全级别--->
	算法 md5 sha1 sha256 sha512
*/