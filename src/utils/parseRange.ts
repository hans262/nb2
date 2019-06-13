export interface Range {
  start: number
  end: number
}

/**
 * 目前只处理第一个分段
 * 必须格式: bytes=0-10
 * 比如说 length=10, 你只能读取0-9的范围
 * 读取包含起始位置和结束位置字节
 * 当前字节：start===end
 * @param range 
 * @param size 
 */
export function parseRange(range: string, size: number): Range {
  const matched: RegExpMatchArray = range.match(/^bytes=(\d+)-(\d+)$/)
  if (!matched) return null

  const start: number = parseInt(matched[1])
  const end: number = parseInt(matched[2])

  if (start > end) return null
  if (end >= size) return null

  return { start, end }
}