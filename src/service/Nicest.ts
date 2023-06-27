import { Middleware } from '../interface/index.js';
import { Context } from '../interface/Context.js';
import { DEBUG } from '../common/logger.js';
import { IncomingMessage, ServerResponse, Server, createServer as createServerHttp } from 'node:http';
import { createServer as createServerHttps } from 'node:https';
import { handleController } from '../middleware/handleController.js';
import { handleStatic } from '../middleware/handleStatic.js';
import { handle404 } from '../middleware/handle404.js';
import { Controller } from '../index.js';

export interface NicestOpt {
  /**ip地址 */
  host: string
  /**端口 */
  port: number
  /**https配置 */
  https?: { key: Buffer, cert: Buffer }
  /**是否让前端处理路由，以适应react应用的history路由模式 */
  frontRoute?: boolean
  /**静态资源根目录 */
  staticRoot?: string
}

export class Nicest {
  server: Server
  /**中间件集合 */
  middlewares: Middleware[] = []
  /**控制器集合 */
  controllers: Controller[] = []
  constructor(public opt: NicestOpt) {
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
  /**
   * 安装控制器
   * @param c 控制器
   */
  useControllers(c: Controller[]) {
    this.controllers = this.controllers.concat(c)
  }

  /**
   * 安装中间件
   * @param m 中间件
   */
  use(...m: Middleware[]) {
    this.middlewares = this.middlewares.concat(m)
  }

  /**
   * 启动服务
   */
  run() {
    //安装默认的中间件
    this.use(handleController(this.controllers))
    //有静态目录才安装该中间件
    if (this.opt.staticRoot) {
      this.use(handleStatic)
    }

    this.server.listen(this.opt.port, this.opt.host, () => {
      DEBUG({ type: 'WORKER_STARTUP', msg: `port: ${this.opt.port}` })
    })
  }

  private handler = (req: IncomingMessage, res: ServerResponse) => {
    const ctx = new Context(req, res, this.opt)
    let i = 0
    const next = (): void => {
      const middleware = this.middlewares[i++]
      if (!middleware) {
        return handle404(ctx)
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