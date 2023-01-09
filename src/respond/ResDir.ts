import { Dirent, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { INDEX_PAGE } from '../configure/index.js';
import { DEBUG } from '../modules/logger.js';
import { ResStatic } from './ResStatic.js';
import { Res404 } from './Res404.js';
import { Context } from '../interface/Context.js';

export function ResDir(ctx: Context) {
  const { staticPath, pathname, startTime, res } = ctx
  let dirents: Array<Dirent>
  try {
    dirents = readdirSync(staticPath, {
      withFileTypes: true
    })
  } catch (error: any) {
    DEBUG({ type: 'ERROR', msg: error.message })
    return Res404(ctx, error.message)
  }
  if (dirents.find(d => d.name === INDEX_PAGE)) {
    //index存在
    ctx.setAbsolutePath(join(staticPath, INDEX_PAGE))
    return ResStatic(ctx)
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