import {
	createHash,
	createHmac,
	createCipheriv,
	createDecipheriv,
	CipherKey,
	BinaryLike,
} from 'node:crypto'

/**
 * 创建哈希密钥
 * 支持算法 md5 sha1 sha256 sha512
 * @param data
 * @param hash
 */
export function createHashSecret(
	data: string,
	hash: 'md5' | 'sha1' | 'sha256' | 'sha512' = 'sha1'
) {
	return createHash(hash).update(data).digest('hex')
}

/**
 * 创建Hmac密钥
 * 支持算法 md5 sha1 sha256 sha512  16进制
 * @param data 加密源
 * @param key 密钥
 */
export function createHmacSecret(
	data: string, key: string,
	hash: 'md5' | 'sha1' | 'sha256' | 'sha512' = 'sha1'
) {
	return createHmac(hash, key).update(data).digest('hex')
}

/**
 * aes加密 ->
 * 支持算法 aes-128-cbc
 * @param data 加密源
 * @param key 密钥
 * @param iv 密钥向量
 */
export function toCipheriv(data: string, key: CipherKey, iv: BinaryLike) {
	const cipher = createCipheriv('aes-128-cbc', key, iv)
	let crypted = cipher.update(data, 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
}

/**
 * aes解密 ->
 * @param data 解密源
 * @param key 密钥
 * @param iv 密钥向量
 */
export function deCipheriv(data: string, key: BinaryLike, iv: BinaryLike) {
	const decipher = createDecipheriv('aes-128-cbc', key, iv)
	let decrypted = decipher.update(data, 'hex', 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted
}