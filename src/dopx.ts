import {
  IncomingMessage,
  ServerResponse,
  Server,
  createServer as createServerHttp,
} from "node:http";
import { createServer as createServerHttps } from "node:https";
import { Context } from "./common/context.js";
import { controllerHandle, staticHandle, corsHandle } from "./middleware.js";
import { out404, out500 } from "./response.js";
import { Middleware } from "./common/model.js";
import { Logger } from "./common/utils.js";
import { metadatas } from "./common/decorator.js";

export interface ServerOpt {
  /**端口 */
  port?: number;
  /**
   * 默认值127.0.0.1
   */
  hostname?: string;
  /**https配置 */
  https?: { key: Buffer; cert: Buffer } | false;
  /**是否允许跨域 */
  cors?:
    | {
        origin: string;
        /**
         * 是否携带cookies、http认证信息
         * 如果为true，则origin不能为*
         */
        credentials?: boolean;
        //预检请求的缓存时间
        maxAge?: number;
      }
    | boolean;

  /**静态资源，没有则表示不响应静态资源 */
  static?:
    | {
        /**静态资源本地根路径*/
        root: string;
        /**默认允许压缩的文件*/
        canZipFile?: string[];
        /**资源缓存时间 单位：秒*/
        cacheMaxAge?: number;
        /**默认渲染的html文件名 */
        indexName?: string;
        /**
         * 单页SPA应用：全部重定向到index.html，
         */
        spa?: boolean;
      }
    | string;
}

export interface _ServerOpt
  extends Required<Omit<ServerOpt, "static" | "cors">> {
  static: Required<Exclude<ServerOpt["static"], string>>;
  cors: Required<Exclude<ServerOpt["cors"], boolean>>;
}

const defaultServerOpt: Omit<_ServerOpt, "static" | "cors"> = {
  port: 8080,
  hostname: "127.0.0.1",
  https: false,
};

const defaultStaticOpt: _ServerOpt["static"] = {
  root: "/",
  canZipFile: ["css", "html", "js", "woff"],
  cacheMaxAge: 12 * 60 * 60, //一天
  indexName: "index.html",
  spa: false,
};

const defaultCorsOpt: _ServerOpt["cors"] = {
  origin: "*",
  credentials: false,
  maxAge: 60,
};

export class Dopx {
  opt: _ServerOpt;
  server: Server;
  /**中间件集合 */
  middlewares: Middleware[] = [];

  /**当前域名 */
  domain: string;
  constructor(opt?: ServerOpt) {
    // 拷贝第一层
    const _opt = Object.assign({}, defaultServerOpt, opt) as _ServerOpt;

    //拷贝static
    if (opt?.static) {
      if (typeof opt.static === "string") {
        _opt.static = Object.assign({}, defaultStaticOpt, {
          root: opt.static,
        });
      }
      if (typeof opt.static === "object") {
        _opt.static = Object.assign({}, defaultStaticOpt, opt.static);
      }
    }
    //拷贝cors
    if (opt?.cors) {
      if (opt.cors === true) _opt.cors = defaultCorsOpt;
      if (typeof opt.cors === "object")
        _opt.cors = Object.assign({}, defaultCorsOpt, opt.cors);
    }

    // console.log(_opt);
    this.opt = _opt;

    this.domain = `${this.opt.https ? "https://" : "http://"}${
      this.opt.hostname
    }:${this.opt.port}`;

    if (this.opt.cors) {
      this.use(corsHandle);
    }

    this.server = this.opt.https
      ? createServerHttps(this.opt.https, this.handler)
      : createServerHttp(this.handler);

    process.on("unhandledRejection", (err: any) => {
      //全局未处理的异步异常
      Logger.self.log({ level: "error", path: "unhandledRejection", msg: err });
    });

    process.on("uncaughtException", (err) => {
      //全局未捕获的同步异常
      Logger.self.log({
        level: "error",
        path: "uncaughtException",
        msg: err.message,
      });
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
   * 安装控制器
   * @param apifix
   * @param cs
   */
  controllers(apifix: string, ...cs: (new () => any)[]) {
    for (const c of cs) {
      const items = metadatas.filter((m) => m.constructorName === c.name);
      for (const item of items) {
        item.apifix = apifix;
      }
    }
  }

  /**
   * 启动服务
   */
  run() {
    //安装控制器中间件
    this.use(controllerHandle);

    /**
     * 静态资源中间件
     */
    if (this.opt.static) {
      this.use(staticHandle);
    }

    this.server.listen(this.opt.port, this.opt.hostname, () => {
      Logger.self.log({
        level: "system",
        path: this.domain,
      });
    });
  }

  private handler = (req: IncomingMessage, res: ServerResponse) => {
    const ctx = new Context(req, res, this.opt, this);
    let i = 0;
    const next = async () => {
      const middleware = this.middlewares[i++];
      if (middleware) {
        try {
          await middleware(ctx, next);
        } catch (err: any) {
          out500(ctx, err);
        }
      } else {
        //全局的404
        return out404(ctx);
      }
    };
    next();
  };
}
