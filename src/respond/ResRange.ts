import { createReadStream, ReadStream } from 'fs';
import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
import { LOG } from '../modules/log';

export function ResRange(req: Req, res: ServerResponse): void {
  const { __absolutePath, __stats } = req
  const { size } = __stats
  //拿到范围，解析范围
  const range: Range = parseRange(req.headers['range'], size)
  //判断范围是否存在
  if (range) {
    const { start, end } = range
    res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
    res.setHeader('Content-Length', (end - start + 1))
    const stream: ReadStream = createReadStream(__absolutePath, { start, end })

    res.writeHead(206, 'Partial content')
    stream.pipe(res)
    LOG({ type: 'RES_RANGE', msg: __absolutePath })
  } else {
    res.removeHeader('Content-Length')
    res.setHeader('Content-Range', `bytes=*/${size}`)
    res.writeHead(416, 'Out of range')
    res.end()
    LOG({ type: '416', msg: __absolutePath })
  }
}

interface Range {
  start: number
  end: number
}

function parseRange(range: string, size: number): Range {
  //目前只处理第一个分段
  //必须格式: bytes=0-10
  //比如说 length=10, 你只能读取0-9的范围
  //读取包含起始位置和结束位置字节
  //当前字节，start===end

  const r0: RegExpMatchArray = range.match(/^bytes=(\d+)-(\d+)$/)
  if (!r0) return null

  const start: number = parseInt(r0[1])
  const end: number = parseInt(r0[2])

  if (start > end) return null
  if (end >= size) return null
  const r: Range = {
    start, end
  }
  return r
}