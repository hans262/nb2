import { createReadStream, ReadStream } from 'fs';
import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
import { LOG } from '../modules/log';
import { parseRange, Range } from '../utils/parseRange';

export function ResRange(req: Req, res: ServerResponse): void {
  const { __absolutePath, __stats } = req
  const { size } = __stats!

  //解析范围
  const range: Range | null = parseRange(req.headers['range'], size)
  //判断范围是否存在
  if (range) {
    const { start, end } = range
    res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
    res.setHeader('Content-Length', (end - start + 1))
    const stream: ReadStream = createReadStream(__absolutePath!, { start, end })

    res.writeHead(206, 'Partial content')
    stream.pipe(res)
    LOG({ type: 'RES_RANGE', msg: __absolutePath! })
  } else {
    res.removeHeader('Content-Length')
    res.setHeader('Content-Range', `bytes=*/${size}`)
    res.writeHead(416, 'Out of range')
    res.end()
    LOG({ type: 'RES_416', msg: __absolutePath! })
  }
}