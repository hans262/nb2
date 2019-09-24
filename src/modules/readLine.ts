import { createInterface } from 'readline'
import { createReadStream } from 'fs';
import { join } from 'path';
import { PUBLIC_PATH } from '../common/path';

/**
 * cli demo
 */
function cli() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>> '
  })

  rl.prompt()

  rl.on('line', (line: string) => {
    console.log(line)
    rl.prompt()
  })

  rl.on('close', () => {
    console.log('good bye!')
    process.exit(0)
  })
}
cli()

/**
 * read line
 */
function readLine() {
  const rl = createInterface({
    input: createReadStream(join(PUBLIC_PATH, 'ajax.js')),
    crlfDelay: Infinity
  })
  rl.on('line', (line: string) => {
    console.log(line)
  })
}