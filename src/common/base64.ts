/**
 * base64 编码
 * @param src 原字符串
 */
export function encodeBase64(src: string): string {
  return Buffer.from(src).toString('base64')
}

/**
 * base64 解码
 * @param src 原字符串
 */
export function decodeBase64(src: string): string {
  return Buffer.from(src, 'base64').toString()
}