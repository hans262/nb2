/**
 * base64编码
 * @param arg 
 */
export function toBase64(arg: string): string {
  return Buffer.from(arg).toString('base64')
}
/**
 * base64解码
 * @param arg 
 */
export function base64ToString(arg: string): string {
  return Buffer.from(arg, 'base64').toString()
}