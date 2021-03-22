import { Stats } from 'fs';
import { IncomingMessage } from 'http'
/**
 * generate ETag
 * @param stats
 */
export function generateETag(stats: Stats): string {
  const mtime: string = stats.mtime.getTime().toString(16)//16进制
  const size: string = stats.size.toString(16)
  return `W/"${mtime}-${size}"`
}

/**
 * check cache
 * @param req 
 */
export function isCache(req: IncomingMessage, stats: Stats): boolean {
  const { headers } = req
  const { mtime } = stats
  const noneMatch: string | undefined = headers['if-none-match']//ETag
  const lastModified: string | undefined = headers['if-modified-since'] //最后修改时间
  if (!(noneMatch || lastModified)) return false
  if (noneMatch !== generateETag(stats!)) return false
  if (lastModified !== mtime.toUTCString()) return false
  return true
}