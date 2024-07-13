import { createReadStream, createWriteStream } from 'node:fs';
import { extname } from 'node:path';
import { createGzip, createGunzip } from 'node:zlib';
import * as http from 'node:http';
import * as https from 'node:https'
import { Method } from './context.js';

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

/**
 * 网络请求 请求
 * @param opt
 */
export function fetchOn(_url: string, opt?: {
  method?: Method
  body?: string | Buffer
}) {
  const url = new URL(_url)
  const rejectUnauthorized = url.protocol === 'https:' && (url.hostname === '127.0.0.1' ||
    url.hostname === 'localhost' || url.hostname === '0.0.0.0') ? false : true

  return new Promise<{
    statusCode?: number
    data: Buffer
  }>((resolve, reject) => {
    const request = url.protocol === 'https:' ? https.request : http.request;
    const req = request({
      path: url.pathname + url.search,
      hostname: url.hostname,
      port: url.port,
      method: opt?.method ?? 'GET',
      rejectUnauthorized //拒绝本地自签名证书的校验
    }, ret => {
      const chunks: Buffer[] = []
      req.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      req.on('end', () => {
        const data = Buffer.concat(chunks)
        resolve({ statusCode: ret.statusCode, data })
      })
    })

    req.on('error', (err) => {
      reject(err)
    })

    if (opt?.method === 'POST' && opt.body) {
      req.write(opt.body)
    }

    req.end()
  })
}

/**
 * @document documents/external-markdown.md
 * 
 * 这里是我的文档
 */