import { IncomingMessage } from "node:http";
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
 * 解析FormData数据
 * @param ctx 
 * @param boundary 
 * @param contentLength 
 */
export function parseFormData(buf: Buffer, boundary: string, contentLength: number) {
  const result: FormData[] = []

  //中间标志
  const midBoundary = '\r\n--' + boundary + '\r\n'
  //开始标志
  const startBoundary = Buffer.from('--' + boundary + '\r\n')
  //结束标志
  const endBoundary = Buffer.from('\r\n--' + boundary + '--\r\n')
  //空对象的全部内容
  const nullContent = Buffer.from('--' + boundary + '--\r\n')

  //空类容检查 'FormData对象内容为空'
  if (contentLength <= nullContent.byteLength) {
    return result
  }

  //去掉首尾
  const temp = buf.subarray(
    startBoundary.byteLength,
    buf.byteLength - endBoundary.byteLength
  )
  //文件分割
  const bufs = bufferSplit(temp, midBoundary)
  for (const buf of bufs) {
    // console.log(buf.toString())
    let index = buf.indexOf('\r\n', 0)

    const lineOne = buf.subarray(0, index).toString()

    const [_, filename] = lineOne.match(/filename="([^;]+)"/) ?? []
    const [__, name] = lineOne.match(/name="([^;]+)"/) ?? []

    let ContentType: FormData['ContentType'];

    //判断是否是文件，文件多一行content-type
    if (filename) {
      const tmp = buf.indexOf('\r\n', index + 2)
      const lineTwo = buf.subarray(index + 2, tmp).toString()

      const [__, ct] = lineTwo.match(/Content-Type:\s([^;]+)/) ?? []
      ContentType = ct

      index = tmp + 4
    } else {
      index += 4
    }
    const data = buf.subarray(index)
    result.push({ name, filename, data, ContentType })
  }
  return result
}

export interface FormData {
  name: string
  /**文件才有，没有就是纯数据 */
  filename?: string
  ContentType?: string
  data: Buffer
}

/**
 * 接收body数据
 * @param ctx 
 */
export function getBodyData(req: IncomingMessage) {
  return new Promise<Buffer>((resolve) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })

    req.on('end', () => {
      resolve(Buffer.concat(chunks))
    })
  })
}

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
