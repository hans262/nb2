import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { HOST } from '../configure';
import { Middleware } from '../Interface/Middleware';
import { Context } from '../Interface/Context';
import MIDDLEWARE from '../middleware';
import { DEBUG } from '../modules/logger';

export class Nicest {
  server: Server
  constructor() {
    this.server = createServer(this.handler)
    process.on('message', this.onMessage)
  }
  onMessage = (action: any) => {
    switch (action.type) {
      case 'CLOSE_SERVER':
        const { code } = action
        //关闭server
        this.server.close()
        //等待关闭进程
        setTimeout(() => {
          process.exit(code)
        }, 10000)
        return
    }
  }
  listen(p: number) {
    this.server.listen(p, HOST, () => {
      DEBUG({ type: 'WORKER_STARTUP', msg: `port: ${p}` })
    })
  }
  handler = (req: IncomingMessage, res: ServerResponse) => {
    const ctx = new Context(req, res)
    let i = 0
    const next = (): void => {
      const middleware: Middleware = MIDDLEWARE[i++]
      if (!middleware) return
      try {
        middleware(ctx, next)
      } catch (err) {
        //writeHead只能调用一次，需检查中间件中是否已经调用
        // res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end('statusCode: 500, message: ' + err.message)
        DEBUG({ type: 'ERROR', msg: err.message })
      }
    }
    next()
  }
}