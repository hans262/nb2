import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { HOST, PORT } from '../configure';
import { Middleware } from '../Interface/Middleware';
import MIDDLEWARE from '../middleware';
import { DEBUG } from '../modules/logger';

function HANDLER(req: IncomingMessage, res: ServerResponse): void {
  try {
    let i = 0
    const next = (): void => {
      const middleware: Middleware = MIDDLEWARE[i++]
      if (!middleware) return
      middleware(req, res, next)
    }
    next()
  } catch (err) {
    //这里有可能已经writeHead了，再使用的话就会出错
    // res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end('500 服务器错误' + err.message)
    DEBUG({ type: 'ERROR', msg: err.message })
  }
}

export function RUN_WORKER() {
  const server: Server = createServer(HANDLER)
  server.listen(PORT, HOST, () => {
    DEBUG({ type: 'WORKER_STARTUP', msg: `port: ${PORT}` })
  })
  process.on('message', action => {
    switch (action.type) {
      case 'CLOSE_SERVER':
        const { code } = action
        //关闭与父进程的IPC通道
        // process.disconnect()
        //关闭server
        server.close()
        //等待关闭进程
        setTimeout(() => {
          process.exit(code)
        }, 10000)
        break
      default:
        throw new Error('No MsgType!')
    }
  })
}