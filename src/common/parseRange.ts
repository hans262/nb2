export interface Range {
  start: number
  end: number
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
export function parseRange(range: string | undefined, size: number): Range | null {
  if (!range) return null
  const matched: RegExpMatchArray | null = range.match(/^bytes=(\d+)-(\d+)$/)
  if (!matched) return null

  const start: number = parseInt(matched[1])
  const end: number = parseInt(matched[2])

  if (start > end) return null
  if (end >= size) return null

  return { start, end }
}