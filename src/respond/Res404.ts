import { join } from 'node:path';
import { INDEX_PAGE, REACT_APP, STATIC_PATH } from '../configure/index.js';
import { Context } from '../interface/Context.js';
import { DEBUG } from '../modules/logger.js';
import { ResStatic } from './ResStatic.js';

export function Res404(ctx: Context, reason?: string) {
  const { staticPath, pathname, startTime, res } = ctx

  if (REACT_APP) {
    const reactIndexPath = join(STATIC_PATH, INDEX_PAGE)
    ctx.setAbsolutePath(reactIndexPath)
    return ResStatic(ctx)
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.writeHead(404, 'Not Found')
  res.end(`
  	<h1>404</h1>
  	<p>${pathname} ${reason ?? '当前路径不存在。'} </p>
  `)
  DEBUG({
    type: 'RES_404',
    msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
  })
}
