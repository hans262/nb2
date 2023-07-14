/**
 * buffer 分割
 * @param buffer 需要分割的buffer
 * @param spl
 */
export function bufferSplit(buffer: Buffer, spl: string): Buffer[] {
  const result: Buffer[] = []
  let offset = 0, index = 0;
  while ((index = buffer.indexOf(spl, offset)) !== -1) {
    result.push(buffer.subarray(offset, index))
    offset = index + spl.length
  }
  result.push(buffer.subarray(offset))
  return result.filter(b => b.byteLength)
}

/**
 * const buffer = Buffer.from('\r\n大青蛙私たち\r\n一天の一夜他\r\n我看iirftgr\r\n')
 * const results = bufferSplit(buffer, '\r\n')
 */