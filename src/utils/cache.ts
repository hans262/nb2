import { Stats } from 'fs'

/**
 * 生成ETag
 * @param {object} stats 
 */
export function generateETag(stats: Stats) {
  const mtime = stats.mtime.getTime().toString(16)//16进制
  const size = stats.size.toString(16)
  return `W/"${mtime}-${size}"`
}
/**
 * 验证缓存
 * @param {object} req 
 */
export function isCache(req) {
  const { headers, stats } = req
  const { mtime } = stats
  const noneMatch = headers['if-none-match']//ETag
  const lastModified = headers['if-modified-since'] //最后修改时间
  if (!(noneMatch || lastModified)) return false
  if (noneMatch !== generateETag(stats)) return false
  if (lastModified !== mtime.toUTCString()) return false
  return true
}