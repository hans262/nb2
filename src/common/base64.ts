/**
 * base64 encode
 * @param arg 
 */
export function encodeBase64(arg: string): string {
  return Buffer.from(arg).toString('base64')
}

/**
 * base64 decode
 * @param arg 
 */
export function decodeBase64(arg: string): string {
  return Buffer.from(arg, 'base64').toString()
}