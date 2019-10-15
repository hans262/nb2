import { start, REPLServer } from 'repl'
import { createInterface } from 'readline'

/**
 * repl server
 */
export function createCmd(): REPLServer {
  const repl = start({ prompt: '$ ' })

  repl.defineCommand('sayhello', {
    help: '打招呼',
    action: (name: string) => {
      repl.clearBufferedCommand()
      console.log(`你好, ${name}!`)
      repl.displayPrompt()
    }
  })

  repl.defineCommand('saybye', {
    help: '退出',
    action: () => {
      console.log('good bye!')
      repl.close()
    }
  })
  return repl
}

/**
 * cli server
 */
export function createLli() {
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
