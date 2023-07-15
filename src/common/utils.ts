import { createHash } from "node:crypto";
import { IncomingMessage } from "node:http";

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
 * const results = bufferSplit(buffer, '\r\n')
 */

/**
 * 解析FormData数据
 * 确保ContentType === multipart/form-data，且boundary存在
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
 * 创建密钥
 * 支持算法 md5 sha1 sha256 sha512  16进制
 * @param data 加密源
 * @param hash
 */
export function createSecretKey(
  data: string,
  hash: 'md5' | 'sha1' | 'sha256' | 'sha512' = 'sha1'
) {
  return createHash(hash).update(data).digest('hex')
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