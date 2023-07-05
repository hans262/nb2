import { Context } from '../interface/Context.js';
import { stdlog } from '../common/logger.js';
import { Stats } from 'node:fs';

export function responseCache(ctx: Context) {
  const { staticPath, startTime, res } = ctx
  res.writeHead(304, 'Not Modified')
  res.end()
  stdlog({
    type: 'cache',
    msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
  })
}

/**
 * 生成 ETags
 * @param stats
 */
export function generateETag(stats: Stats) {
  //文件最后修改时间的毫秒值，16进制
  const mtime: string = stats.mtimeMs.toString(16)
  const size: string = stats.size.toString(16)
  return `W/"${mtime}-${size}"`
}

/**
 * 校验当前资源是否命中etag缓存
 * @param ctx 
 * @param stats 当前资源
 * @returns 
 */
export function isHitEtagCache(ctx: Context, stats: Stats) {
  const ifNoneMatch = ctx.req.headers['if-none-match'] //客户端ETag
  return ifNoneMatch === generateETag(stats)
}