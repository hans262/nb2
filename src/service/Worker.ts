import { HOST, HTTPS } from '../configure/index.js';
import { Middleware } from '../Interface/Middleware.js';
import { Context } from '../Interface/Context.js';
import MIDDLEWARE from '../middleware/index.js';
import { DEBUG } from '../modules/logger.js';
import { IncomingMessage, ServerResponse, Server, createServer as createServerHttp } from 'node:http';
import { createServer as createServerHttps } from 'node:https';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PUBLIC_PATH } from '../common/path.js';

const options = {
  key: readFileSync(join(PUBLIC_PATH, './localhost+2-key.pem')),
  cert: readFileSync(join(PUBLIC_PATH, 'localhost+2.pem'))
};

export class Nicest {
  server: Server
  constructor() {
    this.server = HTTPS ? createServerHttps(options, this.handler) : createServerHttp(this.handler)
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
      } catch (err: any) {
        //writeHead只能调用一次，需检查中间件中是否已经调用
        // res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end('statusCode: 500, message: ' + err.message)
        DEBUG({ type: 'ERROR', msg: err.message })
      }
    }
    next()
  }
}