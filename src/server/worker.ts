import { createServer } from 'http'
import { PORT, HOST } from '../conf'

export async function worker(): Promise<void> {
  const { HANDLER } = require('./Main')
  const server = createServer(HANDLER)

  server.listen(PORT, HOST, () => {
    process.send({
      type: 'INFO',
      pid: process.pid,
      msgtype: 'WORKER STARTUP',
      msg: `port: ${PORT}`
    })
  })

  process.on('message', action => {
    switch (action.type) {
      case 'CLOSE_SERVER':
        //平滑关闭server
        const { code } = action
        setTimeout(() => {
          process.exit(code)
        }, 10000)
        server.close()
        break
      default:
        throw new Error('No MsgType!')
    }
  })
}