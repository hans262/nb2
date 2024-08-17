import {
  IncomingMessage,
  ServerResponse,
  Server,
  createServer as createServerHttp,
} from "node:http";
import { createServer as createServerHttps } from "node:https";
import { Context } from "./context.js";
import { Logger, out404, out500 } from "./utils.js";
import { Middleware } from "./middleware.js";

export interface ServerOpt {
  /**端口 */
  port?: number;
  /**默认值127.0.0.1 */
  hostname?: string;
  /**https配置 */
  https?: { key: Buffer; cert: Buffer } | false;
  /**日志 */
  log?: ("error" | "info")[];
}

var dssopt: Required<ServerOpt> = {
  port: 8080,
  hostname: "127.0.0.1",
  https: false,
  log: ["error", "info"],
};

export class Nb2 {
  opt: Required<ServerOpt>;
  log: Logger;
  cname: string;
  private server: Server;
  private middlewares: Middleware[] = [];
  constructor(opt?: ServerOpt) {
    this.opt = Object.assign({}, dssopt, opt);
    this.log = new Logger(this.opt.log);

    this.cname = `${this.opt.https ? "https://" : "http://"}${
      this.opt.hostname
    }:${this.opt.port}`;

    this.server = this.opt.https
      ? createServerHttps(this.opt.https, this.handle)
      : createServerHttp(this.handle);

    process.on("unhandledRejection", (err: any) => {
      //未处理的异步异常
      this.log.error(err, "unhandledRejection");
    });

    process.on("uncaughtException", (err) => {
      //未处理的同步异常
      this.log.error(err, "uncaughtException");
      //退出进程记录日志
      process.exit(1);
    });
  }

  /**
   * 优雅的关闭服务
   * @param callback
   */
  close(callback?: (err?: Error) => void) {
    this.server.close(callback);
  }

  /**
   * 安装中间件
   * @param m 中间件
   */
  use(m: Middleware) {
    this.middlewares = this.middlewares.concat(m);
  }

  /**
   * 启动服务
   */
  run() {
    this.server.listen(this.opt.port!, this.opt.hostname, () => {
      this.log.info(`server runing on -> ${this.cname}`, "yellow");
    });
  }

  private handle = async (req: IncomingMessage, res: ServerResponse) => {
    const ctx = new Context(req, res, this);
    let i = 0;

    const next = async () => {
      const middleware = this.middlewares[i++];
      //全局404
      if (!middleware) return out404(ctx);
      try {
        await middleware(ctx, next);
      } catch (err: any) {
        out500(ctx, err);
      }
    };
    next();
  };
}
