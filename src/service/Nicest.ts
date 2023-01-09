import { HOST } from '../configure/index.js';
import { Middleware } from '../interface/index.js';
import { Context } from '../interface/Context.js';
import { DEBUG } from '../modules/logger.js';
import { IncomingMessage, ServerResponse, Server, createServer as createServerHttp } from 'node:http';
import { createServer as createServerHttps } from 'node:https';
import { MimeTypes } from '../common/mime.js';

interface NicestOpt {
  https?: { key: Buffer, cert: Buffer }
}

export class Nicest {
  server: Server
  middlewares: Middleware[] = []
  
  constructor(opt: NicestOpt = {}) {
    const { https } = opt
    this.server = https ? createServerHttps(https, this.handler) : createServerHttp(this.handler)

    process.on('message', this.onMessage)
    process.on('uncaughtException', err => {
      DEBUG({ type: 'ERROR', msg: err.message })
    })
  }

  private onMessage = (action: any) => {
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

  use(...m: Middleware[]) {
    this.middlewares = this.middlewares.concat(m)
  }

  run(p: number) {
    this.server.listen(p, HOST, () => {
      DEBUG({ type: 'WORKER_STARTUP', msg: `port: ${p}` })
    })
  }

  private handler = (req: IncomingMessage, res: ServerResponse) => {
    const ctx = new Context(req, res)
    let i = 0
    const next = (): void => {
      const middleware = this.middlewares[i++]
      if (!middleware) {
        res.writeHead(404, { 'Content-Type': MimeTypes['txt'] + '; charset=utf-8' })
        res.end('Not Found')
        return
      }
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