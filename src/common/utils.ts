import { createReadStream, createWriteStream } from 'node:fs';
import { extname } from 'node:path';
import { createGzip, createGunzip } from 'node:zlib';

/**
 * buffer 分割
 * @param buffer 需要分割的buffer
 * @param spl
 */
export function bufferSplit(buffer: Buffer, spl: string): Buffer[] {
  const result: Buffer[] = []
  let offset = 0, index = 0;
  while ((index = buffer.indexOf(spl, offset)) !== -1) {
    result.push(buffer.subarray(offset, index))
    offset = index + spl.length
  }
  result.push(buffer.subarray(offset))
  return result.filter(b => b.byteLength)
}
/**
 * const buffer = Buffer.from('\r\n大青蛙私たち\r\n一天の一夜他\r\n我看iirftgr\r\n')
 * const ret = bufferSplit(buffer, '\r\n')
 */

/**
 * gzip 压缩
 * 默认存放到原始文件目录
 * @param name
 */
export function toGzip(name: string) {
  const gzip = createGzip()
  const inp = createReadStream(name)
  const out = createWriteStream(name + '.gz')
  inp.pipe(gzip).pipe(out)
}

/**
 * gzip 解压
 * 默认存放到原始文件目录
 * @param name
 */
export function unGzip(name: string) {
  const ext = extname(name)
  const newFileName = name.split(ext)[0]
  const gzip = createGunzip()
  const inp = createReadStream(name)
  const out = createWriteStream(newFileName)
  inp.pipe(gzip).pipe(out)
}

/**
 * base64 编码
 * @param data
 */
export function encodeBase64(data: string) {
  return Buffer.from(data).toString('base64')
}

/**
 * base64 解码
 * @param data
 */
export function decodeBase64(data: string) {
  return Buffer.from(data, 'base64').toString()
}
