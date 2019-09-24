import { Stats } from 'fs';
import { Req } from '../Interface/Req';

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
export function isCache(req: Req): boolean {
  const { headers, __stats } = req
  const { mtime } = __stats!
  const noneMatch: string | undefined = headers['if-none-match']//ETag
  const lastModified: string | undefined = headers['if-modified-since'] //最后修改时间
  if (!(noneMatch || lastModified)) return false
  if (noneMatch !== generateETag(__stats!)) return false
  if (lastModified !== mtime.toUTCString()) return false
  return true
}