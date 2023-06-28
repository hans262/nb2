import { createReadStream, ReadStream, Stats } from 'node:fs';
import { DEBUG } from '../common/logger.js';
import { parseRange, Range } from '../common/Range.js';
import { Context } from '../interface/Context.js';

export function responseRange(ctx: Context, stats: Stats) {
  const { staticPath, startTime, req, res } = ctx

  //解析范围
  const range: Range | null = parseRange(req.headers['range'], stats.size)
  //判断范围是否存在
  if (range) {
    const { start, end } = range
    res.setHeader('Content-Range', `bytes ${start}-${end}/${stats.size}`)
    res.setHeader('Content-Length', (end - start + 1))
    const stream: ReadStream = createReadStream(staticPath, { start, end })

    res.writeHead(206, 'Partial content')
    stream.pipe(res)
    DEBUG({
      type: 'RES_RANGE',
      msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
    })
  } else {
    res.removeHeader('Content-Length')
    res.setHeader('Content-Range', `bytes=*/${stats.size}`)
    res.writeHead(416, 'Out of range')
    res.end()
    DEBUG({
      type: 'RES_416',
      msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
    })
  }
}