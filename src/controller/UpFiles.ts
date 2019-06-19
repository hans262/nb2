import { ServerResponse } from 'http';
import { Controller } from '../Interface/Controller';
import { Req } from '../Interface/Req';

/**
 * 多文件
 */
export default new class UpFile implements Controller {
  PATH = '/api/upfiles'
  getBoundary(req: Req): string {
    const contentType: string = req.headers['content-type']
    return contentType ? contentType.split('boundary=')[1] : null
  }

  POST(req: Req, res: ServerResponse): void {
    const chunks: Array<Buffer> = []
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })
    req.on('end', () => {
      //拿到总的数据体
      const buffers: Buffer = Buffer.concat(chunks)
      console.log(buffers.toString())

      //相应客户端
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify({ sucess: true, result: '上传成功' }))
    })
  }
}