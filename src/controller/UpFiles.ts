import { ServerResponse } from 'http';
import { Controller } from '../Interface/Controller';
import { Req } from '../Interface/Req';
import { bufferSplit } from '../modules/bufferSplit';

/**
 * 文件上传 只支持formdata
 */
export default new class UpFile implements Controller {
  PATH_NAME: string = '/api/upfiles'
  //10M
  MAX_SIZE: number = 1024 * 1024 * 10
  resError(res: ServerResponse, msg: string) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ sucess: true, result: msg }))
  }
  POST(req: Req, res: ServerResponse): void {
    //拿到content-length，非空检查
    const contentLength: string | undefined = req.headers['content-length']
    if (!contentLength) return this.resError(res, 'content-length 不存在')
    const contentLength2: number = parseInt(contentLength)
    //？做大小限制
    if (contentLength2 > this.MAX_SIZE) return this.resError(res, '超出尺寸')

    //拿到文件分隔符，非空检查
    const contentType: string | undefined = req.headers['content-type']
    if (!contentType) return this.resError(res, 'content-type 不存在')
    const matched: RegExpMatchArray | null = contentType.match(/(^| )boundary=([^;]*)(;|$)/)
    if (!matched) return this.resError(res, 'boundary 不存在')
    const boundary: string = '--' + matched[2]
    const boundary2: string = '\r\n' + boundary + '\r\n'
    const startBoundary: Buffer = Buffer.from(boundary + '\r\n')
    const endBoundary: Buffer = Buffer.from('\r\n' + boundary + '--\r\n')
    const endBoundary2: Buffer = Buffer.from(boundary + '--\r\n')

    //接收数据
    const chunks: Array<Buffer> = []
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })
    req.on('end', () => {
      const buffers: Buffer = Buffer.concat(chunks)
      // console.log(buffers.toString())

      //空类容检查，检查字节是否大于分隔符
      if (contentLength2 <= endBoundary2.byteLength) {
        return this.resError(res, '类容为空')
      }
      //去掉首尾
      const temp: Buffer = buffers.slice(
        startBoundary.byteLength,
        buffers.byteLength - endBoundary.byteLength
      )
      //多文件分割
      const temp2: Buffer[] = bufferSplit(temp, boundary2)

      //解析
      const result: Array<FormData> = []
      for (const buf of temp2) {
        let type: 'file' | 'data'
        let offset: number = 0
        let index: number = 0
        index = buf.indexOf('\r\n', offset)
        const oneLine: string = buf.slice(offset, index).toString()
        offset = index + 2
        index = buf.indexOf('\r\n', offset)
        const twoLine: string = buf.slice(offset, index).toString()

        //判断是否是文件，文件多一行content-type
        offset = twoLine.length ? index + 2 + 2 : index + 2
        type = twoLine.length ? 'file' : 'data'

        const formData: Buffer = buf.slice(offset)
        result.push({ oneLine, type, twoLine, formData, byteLength: formData.byteLength })
      }
      console.log(result)
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify({ sucess: true, result: '上传成功' }))
    })
  }
}

type FormData = {
  type: 'file' | 'data'
  oneLine: string
  twoLine: string
  formData: Buffer,
  byteLength: number
}