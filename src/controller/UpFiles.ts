import { ServerResponse } from 'http';
import { Controller } from '../Interface/Controller';
import { Req } from '../Interface/Req';
import { bufferSplit } from '../modules/bufferSplit';

/**
 * 多文件 只支持formdata
 */
export default new class UpFile implements Controller {
  PATH = '/api/upfiles'
  POST(req: Req, res: ServerResponse): void {
    const chunks: Array<Buffer> = []
    //？做大小限制
    //接收数据
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })
    req.on('end', () => {
      //？做空类容检查
      const buffers: Buffer = Buffer.concat(chunks)
      // console.log(buffers.toString())
      //？这里要做非null检查
      const contentType: string = req.headers['content-type'] as string
      //？这里要做非null检查
      const matched: RegExpMatchArray = contentType.match(/(^| )boundary=([^;]*)(;|$)/) as RegExpMatchArray
      const boundary: string = '--' + matched[2]
      // console.log(boundary)
      //去掉首尾
      const startBoundary: Buffer = Buffer.from(boundary + '\r\n')
      const endBoundary: Buffer = Buffer.from('\r\n' + boundary + '--\r\n')
      const temp: Buffer = buffers.slice(
        startBoundary.byteLength,
        buffers.byteLength - endBoundary.byteLength
      )
      //分割
      const boundary2: string = '\r\n' + boundary + '\r\n'
      const temp2: Buffer[] = bufferSplit(temp, boundary2)
      //解析
      const result: Array<Files> = []
      for (const buf of temp2) {
        let offset: number = 0
        let index: number = 0
        index = buf.indexOf('\r\n', offset)
        const oneLine: string = buf.slice(offset, index).toString()
        offset = index + 2
        index = buf.indexOf('\r\n', offset)
        const twoLine: string = buf.slice(offset, index).toString()
        offset = index + 2 + 2
        const formData = buf.slice(offset)
        result.push({ oneLine, twoLine, formData })
      }
      console.log(result)
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify({ sucess: true, result: '上传成功' }))
    })
  }
}

type Files = {
  oneLine: string
  twoLine: string
  formData: Buffer
}

// export default new class UpFile implements Controller {
//   PATH = '/api/upfiles'
//   POST(req: Req, res: ServerResponse): void {
//     const form: Form = new Form()
//     form.parse(req, (err: Error, fields, files) => {
//       console.log(files)
//       res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
//       res.end(JSON.stringify({ sucess: true, result: '上传成功' }))
//     })
//   }
// }