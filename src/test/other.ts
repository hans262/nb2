/**
 * base64 编码 解码 ->
 */
const encodeBase64s: string = Buffer.from('hello').toString('base64')
const decodeBase64s: string = Buffer.from(encodeBase64s, 'base64').toString()