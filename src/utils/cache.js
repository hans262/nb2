/**
 * 生成ETag
 * @param {object} stats 
 */
function generateETag(stats) {
  const mtime = stats.mtime.getTime().toString(16)//16进制
  const size = stats.size.toString(16)
  return `W/"${mtime}-${size}"`
}
/**
 * 验证缓存
 * @param {object} req 
 */
function isCache(req) {
  const { headers, stats } = req
  const { mtime } = stats
  const noneMatch = headers['if-none-match']//ETag
  const lastModified = headers['if-modified-since'] //最后修改时间
  if (!(noneMatch || lastModified)) return false
  if (noneMatch !== generateETag(stats)) return false
  if (lastModified !== mtime.toUTCString()) return false
  return true
}

module.exports = {
  isCache,
  generateETag
}