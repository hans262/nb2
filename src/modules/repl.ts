import { start } from 'repl'

/**
 * repl server
 */
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