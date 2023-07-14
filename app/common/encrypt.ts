import {
	createHash,
	createHmac,
	createCipheriv,
	createDecipheriv,
	CipherKey,
	BinaryLike,
	getHashes,
	getCiphers
} from 'node:crypto'

// console.log(getCiphers())
// console.log(getHashes())

/**
 * Hash加密 ->
 * 支持算法 md5 sha1 sha256 sha512  16进制
 * @param data 加密源
 */
export function Hash(data: BinaryLike): string {
	return createHash('sha256').update(data).digest('hex')
}

/**
 * Hmac加密 ->
 * 支持算法 md5 sha1 sha256 sha512  16进制
 * @param data 加密源
 * @param key 密钥
 */
export function Hmac(data: BinaryLike, key: BinaryLike): string {
	return createHmac('md5', key).update(data).digest('hex')
}

/**
 * aes加密 ->
 * 支持算法 aes-128-cbc 16进制
 * @param data 加密源
 * @param key 密钥
 * @param iv 密钥向量
 */
export function Cipheriv(data: string, key: CipherKey, iv: BinaryLike): string {
	const cipher = createCipheriv('aes-128-cbc', key, iv)
	let crypted = cipher.update(data, 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
}

/**
 * aes解密 ->
 * 支持算法 aes-128-cbc 16进制
 * @param data 解密源
 * @param key 密钥
 * @param iv 密钥向量
 */
export function Decipheriv(data: string, key: BinaryLike, iv: BinaryLike): string {
	const decipher = createDecipheriv('aes-128-cbc', key, iv)
	let decrypted = decipher.update(data, 'hex', 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted
}

/**
 * aes demo ->
 * const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8');
 * const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8');
 * console.log(Cipheriv('hello', key, iv))
 * //dd5c27de141494924da6e6db3276de20
 * console.log(Decipheriv('dd5c27de141494924da6e6db3276de20', key, iv))
 */

/*
	AES  对称加密解密  安全级别--->
	算法 aes192 aes-128-cbc aes-256-cbc

	MD5  哈希加密  安全级别--->
	算法 md5 sha1 sha256 sha512

	Hmac  哈希加密 安全级别--->
	算法 md5 sha1 sha256 sha512

	hex 16进制
*/