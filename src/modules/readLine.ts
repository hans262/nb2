import { createInterface, Interface } from 'readline'
import { createReadStream } from 'fs';

/**
 * @version 2019-10-15
 * @param path 
 */
export function readLine(path: string): Interface {
  const rl = createInterface({
    input: createReadStream(path),
    crlfDelay: Infinity
  })
  rl.on('line', (line: string) => {
    console.log(line)
  })
  return rl
}

/**
 * test
 * readLine(join(PUBLIC_PATH, 'ajax.js'))
 */
