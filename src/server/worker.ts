import { createServer, Server } from 'http';
import { HOST, PORT } from '../conf';
import { DEBUG } from '../modules/logger';
import { HANDLER } from './Main';

export async function RUN(): Promise<void> {
  const server: Server = createServer(HANDLER)
  server.listen(PORT, HOST, () => {
    DEBUG({ type: 'WORKER_STARTUP', msg: `port: ${PORT}` })
  })

  process.on('message', action => {
    switch (action.type) {
      case 'CLOSE_SERVER':
        const { code } = action
        //平滑关闭server
        server.close()
        setTimeout(() => {
          process.exit(code)
        }, 10000)
        break
      default:
        throw new Error('No MsgType!')
    }
  })

}