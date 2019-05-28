import { Stats } from 'fs'
import { Req } from '../Interface/Req';

/**
 * 生成ETag
 * @param stats
 */
export function generateETag(stats: Stats): string {
  const mtime: string = stats.mtime.getTime().toString(16)//16进制
  const size: string = stats.size.toString(16)
  return `W/"${mtime}-${size}"`
}
/**
 * 验证缓存
 * @param req 
 */
export function isCache(req: Req): boolean {
  const { headers, stats } = req
  const { mtime } = stats
  const noneMatch: string = headers['if-none-match']//ETag
  const lastModified: string = headers['if-modified-since'] //最后修改时间
  if (!(noneMatch || lastModified)) return false
  if (noneMatch !== generateETag(stats)) return false
  if (lastModified !== mtime.toUTCString()) return false
  return true
}