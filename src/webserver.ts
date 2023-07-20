import { IncomingMessage, ServerResponse, Server, createServer as createServerHttp } from 'node:http';
import { createServer as createServerHttps } from 'node:https';
import { Context, Controller, Middleware } from './common/context.js';
import { stdlog } from './common/logger.js';
import { handleController, handleMounted, handleStatic } from './middleware.js';
import { out404 } from './response.js';

export interface ServerOpt {
  /**端口 */
  port: number
  /**ip地址 */
  host: string
  /**https配置 */
  https: { key: Buffer, cert: Buffer } | false
  /**是否让前端处理路由，以适应react应用的history路由模式 */
  frontRoute: boolean
  /**是否允许跨域 */
  cross: boolean
  /**
   * 静态资源目录，没有则表示不响应静态资源，
   * 静态资源路径 = 目录 + url
   */
  staticRoot?: string
  /**默认允许压缩的文件*/
  canZipFile: string[]
  /**资源缓存时间 单位：秒*/
  cacheMaxAge: number
  /**指定默认渲染的html文件名 */
  indexPageName: string
  /**系统日志存放路径 */
  systemLogPath?: string
}

/**
 * 默认配置
 */
const defaultServerOpt: ServerOpt = {
  host: "127.0.0.1",
  port: 5000,
  canZipFile: ['css', 'html', 'js', 'woff'],
  cacheMaxAge: 12 * 60 * 60, //一天
  indexPageName: 'index.html',
  frontRoute: false,
  https: false,
  cross: true
}

export class WebServer {
  server: Server
  /**中间件集合 */
  middlewares: Middleware[] = []
  /**控制器集合 */
  controllers: Controller[] = []
  opt: ServerOpt
  constructor(opt?: Partial<ServerOpt>) {
    this.opt = Object.assign(defaultServerOpt, opt)
    this.server = this.opt.https ? createServerHttps(this.opt.https, this.handler) : createServerHttp(this.handler)

    process.on('uncaughtException', err => {
      stdlog({
        type: 'error', color: 'red', logPath: this.opt.systemLogPath,
        msg: err.message
      })
    })
  }

  /**
   * 关闭服务，将执行close函数
   * 可以设置一个退出状态吗
   * 主进程可以通过监听子进程的退出码，来执行不同任务
   * 1: 重启；0: 退出服务
   * @param code 退出码，主进程可以更具
   */
  close(code: 0 | 1) {
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
    this.use(
      handleMounted,
      handleController,
      /**
       * 一般放在最后一个位置，
       * 如果资源没有找到，那么直接响应404
       */
      handleStatic
    )
    this.server.listen(this.opt.port, this.opt.host, () => {
      const msg = `${this.opt.https ? 'https://' : 'http://'}${this.opt.host}:${this.opt.port}`
      stdlog({
        type: 'worker_startup', msg,
        color: 'yellow', logPath: this.opt.systemLogPath
      })
    })
  }

  private handler = (req: IncomingMessage, res: ServerResponse) => {
    const ctx = new Context(req, res, this.opt, this)
    let i = 0
    const next = () => {
      const middleware = this.middlewares[i++]
      //默认的中间件出口
      if (!middleware) {
        return out404(ctx)
      }
      try {
        middleware(ctx, next)
      } catch (err: any) {
        //writeHead只能调用一次，需检查中间件中是否已经调用
        //调用了writeHead不能再掉用setHeader/writeHead
        res.end('statusCode: 500, message: ' + err.message)
        stdlog({
          type: 'error', color: 'red',
          msg: err.message, logPath: this.opt.systemLogPath
        })
      }
    }
    next()
  }
}