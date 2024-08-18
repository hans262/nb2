import posix from "node:path/posix";
import { metadatas } from "./decorator.js";
import { out500 } from "./utils.js";
import { Context } from "./context.js";

/**
 * 中间件类型
 */
export type Middleware = (
  ctx: Context,
  next: () => void | Promise<void>
) => Promise<void> | void;

export function cors(
  opt: {
    origin?: string;
    /**
     * 跨域请求是否允许携带cookies、http认证信息
     * 如果为true，则origin不能为*
     */
    credentials?: boolean;
    /**
     * 预检请求的缓存时间，单位ms
     */
    maxAge?: number;
  } = {}
): Middleware {
  return (ctx, next) => {
    const { res, req } = ctx;
    const { maxAge = 60, origin = "*", credentials = false } = opt;
    // preflight
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", origin);
      if (credentials) {
        // 是否允许，origin不能设置为*
        res.setHeader("Access-Control-Allow-Credentials", "true");
      }

      // 允许客户端携带的请求头，动态设置
      const requestHeaders = req.headers["access-control-request-headers"];
      if (requestHeaders) {
        res.setHeader("Access-Control-Allow-Headers", requestHeaders);
      }
      res.setHeader("Vary", "Access-Control-Request-Headers");

      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
      );
      res.setHeader("Access-Control-Max-Age", maxAge.toString());

      res.statusCode = 204;
      res.setHeader("Content-Length", "0");
      res.end();
    } else {
      res.setHeader("Access-Control-Allow-Origin", origin);
      if (credentials) {
        res.setHeader("Access-Control-Allow-Credentials", "true");
      }
      next();
    }
  };
}

export function controllers(
  apifix: string,
  ...cs: (new () => any)[]
): Middleware {
  const constructorNames = cs.map((c) => c.name);
  //筛选需要的元数据，并深拷贝
  const mds = metadatas
    .filter((md) => constructorNames.includes(md.constructorName))
    .map((md) => ({ ...md, apifix }));

  return async (ctx, next) => {
    const { req, pathname } = ctx;
    // console.log(metadatas);

    let params: { [key: string]: string } = {};
    const md = mds.find((c) => {
      if (!c.cpath || !c.instance || c.method !== req.method) return false;

      //如果没有'/'前缀，加上前缀'/'
      const path = posix.join("/", c.apifix ?? "/", c.cpath, c.mpath!);
      const match = ctx.matchRoute(path);
      params = match.params;
      return match.hit;
    });

    if (!md) return next();

    // 存储url参数
    ctx.params = params;

    try {
      await md.instance[md.functionName](ctx);
    } catch (err: any) {
      return out500(ctx, err);
    }
    ctx.app.log.info(`hit controller -> ${pathname}`);
  };
}
