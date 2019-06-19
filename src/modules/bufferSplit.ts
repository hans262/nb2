/**
 * buffer切割 目前存在bug
 * @param buffer 
 * @param spl 
 */
export function bufferSplit(buffer: Buffer, spl: string): Array<Buffer> {
  const result: Array<Buffer> = []
  let offset: number = 0;
  let index: number = 0;
  while ((index = buffer.indexOf(spl, offset)) !== -1) {
    if(index!==0){
      result.push(buffer.slice(offset, index))
    }
    offset = index + spl.length
  }
  result.push(buffer.slice(offset))
  return result
}

/**
 * const buffer: Buffer = Buffer.from('小明\r\n的妈妈\r\n跟我跑了')
 * const results: Array<Buffer> = bufferSplit(buffer, '\r\n')
 * for (let b of results) {
 *  console.log(b.toString())
 * }
 */