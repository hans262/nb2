import { ServerResponse } from 'node:http';
import { Controller } from '../interface/Controller.js';
import { Context } from '../interface/Context.js';
import { bufferSplit } from '../modules/bufferSplit.js';
import { writeFileSync } from 'node:fs';
import { PUBLIC_PATH } from '../index.js';
import { join } from 'node:path';

/**
 * file uoload
 * FormData格式
 * 所需请求头 ->
 * Content-Type:"multipart/form-data; boundary=----WebKitFormBoundaryTK4tKRxDd34z0iSh"
 * Content-Length:"1024"
 */
export class UpFiles implements Controller {
  readonly PATH_NAME: string = '/api/upfiles'
  //max size 10M
  MAX_SIZE: number = 1024 * 1024 * 10
  resError(res: ServerResponse, msg: string) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ sucess: false, result: msg }))
  }
  resOk(res: ServerResponse, msg: string) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ sucess: true, result: msg }))
  }
  POST(ctx: Context) {
    const { req, res } = ctx
    //拿到content-length，非空检查
    const contentLength: string | undefined = req.headers['content-length']
    if (!contentLength) return this.resError(res, 'content-length 不存在')
    const contentLength2: number = parseInt(contentLength)
    //做大小限制
    if (contentLength2 > this.MAX_SIZE) return this.resError(res, '超出尺寸，最大上传尺寸10M')

    //拿到文件分隔符，非空检查
    const contentType: string | undefined = req.headers['content-type']
    if (!contentType) return this.resError(res, 'content-type 不存在')
    const matched: RegExpMatchArray | null = contentType.match(/\s+boundary=([^;]+)/)
    if (!matched) return this.resError(res, 'boundary 不存在')
    const boundary: string = '--' + matched[1]
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
      //空类容检查，检查字节是否大于分隔符
      if (contentLength2 <= endBoundary2.byteLength) {
        return this.resError(res, '类容为空')
      }
      //去掉首尾
      const temp: Buffer = buffers.subarray(
        startBoundary.byteLength,
        - endBoundary.byteLength
      )
      //文件分割
      const temp2: Buffer[] = bufferSplit(temp, boundary2)
      //解析
      const result: Array<FormData> = []
      for (const buf of temp2) {
        let type: 'file' | 'data'
        let offset: number = 0, index: number = 0
        index = buf.indexOf('\r\n', offset)
        const oneLine: string = buf.subarray(offset, index).toString()
        offset = index + 2
        index = buf.indexOf('\r\n', offset)
        const twoLine: string = buf.subarray(offset, index).toString()

        //判断是否是文件，文件多一行content-type
        offset = twoLine.length ? index + 2 + 2 : index + 2
        type = twoLine.length ? 'file' : 'data'

        const formData: Buffer = buf.subarray(offset)
        result.push({ oneLine, type, twoLine, formData, byteLength: formData.byteLength })
      }
      console.log(result[0])
      writeFileSync(join(PUBLIC_PATH, '/aa.jpg'), result[0].formData)
      this.resOk(res, '上传成功')
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