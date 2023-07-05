import { createReadStream, ReadStream, Stats } from 'node:fs';
import { stdlog } from '../common/logger.js';
import { Context } from '../interface/Context.js';

export function responseRange(ctx: Context, stats: Stats) {
  const { staticPath, startTime, req, res } = ctx

  //解析范围
  const range = parseRange(req.headers['range'], stats.size)
  //判断范围是否存在
  if (range) {
    const { start, end } = range
    res.setHeader('Content-Range', `bytes ${start}-${end}/${stats.size}`)
    res.setHeader('Content-Length', (end - start + 1))
    const stream: ReadStream = createReadStream(staticPath, { start, end })

    res.writeHead(206, 'Partial content')
    stream.pipe(res)
    stdlog({
      type: 'range',
      msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
    })
  } else {
    res.removeHeader('Content-Length')
    res.setHeader('Content-Range', `bytes=*/${stats.size}`)
    res.writeHead(416, 'Out of range')
    res.end()
    stdlog({
      type: 'range_416',
      msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
    })
  }
}

/**
 * 目前只处理一个分段
 * 必须格式: bytes=start-end
 * 例: bytelength=10
 * 范围: bytes=0-9
 * 当前字节: start===end
 * 
 * @param range 
 * @param size 
 */
export function parseRange(range: string | undefined, size: number): {
  start: number
  end: number
} | null {
  if (!range) return null
  const matched: RegExpMatchArray | null = range.match(/^bytes=(\d+)-(\d+)$/)
  if (!matched) return null

  const start: number = parseInt(matched[1])
  const end: number = parseInt(matched[2])

  if (start > end) return null
  if (end >= size) return null

  return { start, end }
}