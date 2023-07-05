import { join } from 'node:path';
import { stdlog } from '../common/logger.js';
import { existsSync } from 'node:fs';
import { responseStatic } from '../respond/responseStatic.js';
import { Context } from '../interface/Context.js';

/**
 * 这不是一个中间件，这里收集404的处理
 * @param ctx 
 * @returns 
 */
export const handle404 = (ctx: Context, reason?: string) => {
  const { staticPath, pathname, startTime, res } = ctx

  if (ctx.opt.frontRoute && ctx.opt.staticRoot) {
    //检测该文件存在不存在，以免造成死循环
    const reactIndexPath = join(ctx.opt.staticRoot, ctx.indexPageName)
    if (existsSync(reactIndexPath)) {
      ctx.setStaticPath(reactIndexPath)
      return responseStatic(ctx)
    }
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.writeHead(404, 'Not Found')
  res.end(`
  	<h1>404</h1>
  	<p>${pathname} ${reason ?? '当前路径不存在。'} </p>
  `)

  stdlog({
    type: '404',
    msg: staticPath + ' +' + (Date.now() - startTime) + 'ms',
    color: 'green'
  })
}
