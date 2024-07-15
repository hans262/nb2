import {
  IncomingMessage,
  ServerResponse,
  Server,
  createServer as createServerHttp,
} from "node:http";
import { createServer as createServerHttps } from "node:https";
import { Context, Middleware } from "./common/context.js";
import { handleController, helmet, handleStatic } from "./middleware.js";
import { out404 } from "./response.js";
import { Logger } from "./common/logger.js";

export interface ServerOpt {
  /**端口 */
  port?: number;
  /**
   * 需要侦听的IP地址，
   * 如果忽略了hostname，那么服务器会接受所有的IPv4地址链接。
   * IPv4地址包括127.0.0.1、localhost和本地IP。
   */
  hostname?: string;
  /**https配置 */
  https?: { key: Buffer; cert: Buffer } | false;
  /**是否允许跨域 */
  cors?: boolean;
  /**日志存放路径 */
  logDir?: string;
  /**api前缀 */
  apiPrefix?: string;

  /**静态资源，没有则表示不响应静态资源 */
  static?: {
    /**静态资源本地根路径*/
    root: string;
    /**默认允许压缩的文件*/
    canZipFile?: string[];
    /**资源缓存时间 单位：秒*/
    cacheMaxAge?: number;
    /**默认渲染的html文件名 */
    indexFileName?: string;
    /**
     * 单页应用SPA：全部重定向到index.html，
     * 让前端处理路由，以适应react/vue应用的history路由模式
     */
    spa?: boolean;
  };
}

/**
 * 默认配置
 */
const dServerOpt: ServerOpt = {
  port: 8080,
  https: false,
  cors: true,
};

const dStaticOpt: Partial<ServerOpt["static"]> = {
  canZipFile: ["css", "html", "js", "woff"],
  cacheMaxAge: 12 * 60 * 60, //一天
  indexFileName: "index.html",
  spa: false,
};

export class Dopx {
  opt: ServerOpt;
  server: Server;
  /**中间件集合 */
  middlewares: Middleware[] = [helmet];

  /**当前域名 */
  domain: string;
  constructor(opt?: ServerOpt) {
    /**
     * 注意，第二个参数里的属性为undefined，也会被拷贝进去
     * 这算是一种完全覆盖合并
     */
    const _opt = Object.assign({}, dServerOpt, opt);

    if (_opt.static) {
      _opt.static = Object.assign({}, dStaticOpt, _opt.static);
    }
    this.opt = _opt;
    // console.log(_opt);
    const host = this.opt.hostname ?? "127.0.0.1";
    this.domain = `${this.opt.https ? "https://" : "http://"}${host}:${
      this.opt.port
    }`;

    this.server = this.opt.https
      ? createServerHttps(this.opt.https, this.handler)
      : createServerHttp(this.handler);

    process.on("uncaughtException", (err) => {
      console.log(err);
      // write EIO，该bug未解决，重复写日志bug
      Logger.self.stdlog({
        level: "ERROR",
        color: "red",
        logPath: this.opt.logDir,
        msg: "uncaughtException " + err.message,
      });
    });

    process.on("message", (d: string) => {
      if (d === "restart") {
        this.close(1);
      }
      if (d === "close") {
        this.close(0);
      }
    });
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
    this.server.close();
    setTimeout(() => {
      process.exit(code);
    }, 2000);
  }

  /**
   * 安装中间件
   * @param m 中间件
   */
  use(m: Middleware) {
    this.middlewares = this.middlewares.concat(m);
  }

  controllers(..._: (new () => any)[]) {}

  /**
   * 启动服务
   */
  run() {
    //安装控制器中间件
    this.use(handleController);

    /**
     * 静态资源中间件
     */
    if (this.opt.static) {
      this.use(handleStatic);
    }

    this.server.listen(this.opt.port, this.opt.hostname, () => {
      Logger.self.stdlog({
        level: "INFO",
        msg: this.domain,
        color: "yellow",
        logPath: this.opt.logDir,
      });
    });
  }

  private handler = (req: IncomingMessage, res: ServerResponse) => {
    const ctx = new Context(req, res, this.opt, this);
    let i = 0;
    const next = () => {
      const middleware = this.middlewares[i++];
      if (middleware) {
        middleware(ctx, next);
      } else {
        //出口
        return out404(ctx);
      }
    };

    try {
      next();
    } catch (err: any) {
      // write EIO，该bug未解决，重复写日志bug
      ctx.statusCode(500).text(err.message);
      // console.log(ctx.pathname)
      Logger.self.stdlog({
        level: "ERROR",
        color: "red",
        msg: ctx.pathname + " " + err.message,
        logPath: this.opt.logDir,
      });
    }
  };
}
