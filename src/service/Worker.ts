import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { HOST, PORT } from '../conf';
import { Middleware } from '../Interface/Middleware';
import MIDDLEWARE from '../middleware';
import { DEBUG } from '../modules/logger';

function HANDLER(req: IncomingMessage, res: ServerResponse): void {
  let i = 0
  function next(): void {
    const middleware: Middleware = MIDDLEWARE[i++]
    if (!middleware) return
    middleware(req, res, next)
  }
  next()
}

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