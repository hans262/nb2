import { createReadStream, ReadStream } from 'fs';
import { DEBUG } from '../modules/logger';
import { parseRange, Range } from '../common/Range';
import { Context } from '../Interface/Context';

export function ResRange(ctx: Context) {
  const { absolutePath, stats, startTime, req, res } = ctx
  const { size } = stats!

  //解析范围
  const range: Range | null = parseRange(req.headers['range'], size)
  //判断范围是否存在
  if (range) {
    const { start, end } = range
    res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
    res.setHeader('Content-Length', (end - start + 1))
    const stream: ReadStream = createReadStream(absolutePath!, { start, end })

    res.writeHead(206, 'Partial content')
    stream.pipe(res)
    DEBUG({
      type: 'RES_RANGE',
      msg: absolutePath! + ' +' + (Date.now() - startTime!) + 'ms'
    })
  } else {
    res.removeHeader('Content-Length')
    res.setHeader('Content-Range', `bytes=*/${size}`)
    res.writeHead(416, 'Out of range')
    res.end()
    DEBUG({
      type: 'RES_416',
      msg: absolutePath! + ' +' + (Date.now() - startTime!) + 'ms'
    })
  }
}