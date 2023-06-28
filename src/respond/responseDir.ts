import { Dirent, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DEBUG } from '../common/logger.js';
import { responseStatic } from './responseStatic.js';
import { Context } from '../ainterface/Context.js';
import { handle404 } from '../middleware/handle404.js';

export function responseDir(ctx: Context) {
  const { staticPath, pathname, startTime, res, indexPageName } = ctx
  let dirents: Array<Dirent>
  try {
    dirents = readdirSync(staticPath, {
      withFileTypes: true
    })
  } catch (error: any) {
    DEBUG({ type: 'ERROR', msg: error.message })
    return handle404(ctx, error.message)
  }
  if (dirents.find(d => d.name === indexPageName)) {
    //index存在
    ctx.setStaticPath(join(staticPath, indexPageName))
    return responseStatic(ctx)
  }
  let content: string = `<h1>目录 ${pathname}</h1>`
  dirents.forEach(dirent => {
    let { name } = dirent
    let href: string = join(pathname, name)
    if (dirent.isDirectory()) {
      href += '/'
      name += '/'
    }
    content += `<p><a href="${href}">${name}</a></p>`
  })
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.writeHead(200, 'Access Directory')
  res.end(content)
  DEBUG({
    type: 'RES_DIR',
    msg: staticPath + ' +' + (Date.now() - startTime) + 'ms'
  })
}