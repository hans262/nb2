import { createReadStream, ReadStream } from 'fs';
import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
import { LOG } from '../modules/log';

export function ResZip(req: Req, res: ServerResponse): void {
  const { __absolutePath, __zipstream } = req
  //数据需要压缩，分块传输，所以无法得知数据体的真实大小
  //所有要删除Content-Length属性
  res.setHeader('Transfer-Encoding', 'chunked')
  res.removeHeader('Content-Length')
  const stream: ReadStream = createReadStream(__absolutePath)

  res.writeHead(200, 'Compressed file')
  stream.pipe(__zipstream).pipe(res)
  LOG({ type: 'RES_ZIP', msg: __absolutePath })
}