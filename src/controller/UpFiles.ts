import { ServerResponse } from 'http';
import { Controller } from '../Interface/Controller';
import { Req } from '../Interface/Req';
import { Form } from 'multiparty'

/**
 * 多文件
 */
export default new class UpFile implements Controller {
  PATH = '/api/upfiles'
  POST(req: Req, res: ServerResponse): void {
    const form: Form = new Form()
    form.parse(req, (err: Error, fields, files) => {
      console.log(files)
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify({ sucess: true, result: '上传成功' }))
    })
  }
}