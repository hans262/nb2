import { join } from "node:path";
import { Middleware } from "../index.js";
import { responseStatic } from "../respond/responseStatic.js";

/**
 * 静态资源中间件
 * @param staticRoot 静态资源根目录
 * @returns 
 */
export const handleStatic: Middleware = (ctx, _) => {
  //拼接静态资源路径
  const staticPath = join(ctx.opt.staticRoot!, ctx.pathname)
  ctx.setStaticPath(staticPath)
  responseStatic(ctx)
}