import { Stats } from 'node:fs';
import { IncomingMessage } from 'node:http'

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
 * etag缓存校验
 */
export function isCache(req: IncomingMessage, stats: Stats) {
  const ifNoneMatch = req.headers['if-none-match'] //客户端ETag
  return ifNoneMatch === generateETag(stats)
}