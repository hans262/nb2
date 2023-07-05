import { Middleware } from '../interface/index.js';
import { Context, EmitAction } from '../interface/Context.js';
import { stdlog } from '../common/logger.js';
import { IncomingMessage, ServerResponse, Server, createServer as createServerHttp } from 'node:http';
import { createServer as createServerHttps } from 'node:https';
import { handleController } from '../middleware/handleController.js';
import { handleStatic } from '../middleware/handleStatic.js';
import { handle404 } from '../middleware/handle404.js';
import { Controller } from '../index.js';

export interface NicestOpt {
  /**端口 */
  port?: number
  /**ip地址 */
  host?: string
  /**https配置 */
  https?: { key: Buffer, cert: Buffer }
  /**是否让前端处理路由，以适应react应用的history路由模式 */
  frontRoute?: boolean
  /**静态资源根目录 */
  staticRoot?: string
  /**资源压缩范围 */
  staticZipRange?: string[]
  /**资源缓存时间 单位：秒*/
  cacheMaxAge?: number
}

const defaultNicestOpt: NicestOpt = {
  host: "127.0.0.1",
  port: 5000,
  staticZipRange: ['css', 'html', 'js', 'woff'],
  cacheMaxAge: 12 * 60 * 60 //一天
}

export class Nicest {
  server: Server
  /**中间件集合 */
  middlewares: Middleware[] = []
  /**控制器集合 */
  controllers: Controller[] = []
  opt: NicestOpt
  constructor(opt: NicestOpt = defaultNicestOpt) {
    this.opt = Object.assign(opt, defaultNicestOpt)
    this.server = this.opt.https ? createServerHttps(this.opt.https, this.handler) : createServerHttp(this.handler)

    process.on('uncaughtException', err => {
      stdlog({ type: 'error', msg: err.message })
    })
  }

  onContextEmit(action: EmitAction) {
    if (action.type === 'restart') {
      this.closeServer(1)
    }

    if (action.type === 'shutdown') {
      this.closeServer(0)
    }
  }

  /**
   * 关闭服务
   * 主进程可以通过监听子进程的退出码，来执行不同任务
   * 1: 重启；0: 退出服务
   * @param code 退出码
   */
  private closeServer(code: 0 | 1) {
    //停止接收新的请求，这是一个异步函数，然后关闭server
    this.server.close()
    setTimeout(() => {
      process.exit(code)
    }, 10000)
  }

  /**
   * 安装控制器
   * @param c 控制器
   */
  useControllers(clazz: { new(): Controller }[]) {
    this.controllers = this.controllers.concat(
      clazz.map(c => new c())
    )
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
      const msg = `${this.opt.https ? 'https://' : 'http://'}${this.opt.host}:${this.opt.port}`
      stdlog({ type: 'worker_startup', msg, color: 'yellow' })
    })
  }

  private handler = (req: IncomingMessage, res: ServerResponse) => {
    const ctx = new Context(req, res, this.opt, this)
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
        stdlog({ type: 'error', msg: err.message })
      }
    }
    next()
  }
}