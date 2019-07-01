/**
 * buffer切割 ->
 * @param buffer 切割源
 * @param spl 
 */
export function bufferSplit(buffer: Buffer, spl: string): Array<Buffer> {
  const result: Array<Buffer> = []
  let offset: number = 0
  let index: number = 0
  while ((index = buffer.indexOf(spl, offset)) !== -1) {
    result.push(buffer.slice(offset, index))
    offset = index + spl.length
  }
  result.push(buffer.slice(offset))
  return result.filter(b => b.byteLength)
}

// const buffer: Buffer = Buffer.from('\r\n大青蛙私たち\r\n一天の一夜他\r\n我看iirftgr\r\n')
// const results: Array<Buffer> = bufferSplit(buffer, '\r\n')

// for (let b of results) {
//   console.log(b.toString())
// }