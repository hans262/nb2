import { Dirent, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { INDEX_PAGE } from '../configure/index.js';
import { DEBUG } from '../modules/logger.js';
import { ResStatic } from './ResStatic.js';
import { ResNotFound } from './ResNotFound.js';
import { Context } from '../Interface/Context.js';

export function ResDir(ctx: Context) {
  const { absolutePath, relativePath, startTime, res } = ctx
  let dirents: Array<Dirent>
  try {
    dirents = readdirSync(absolutePath!, {
      withFileTypes: true
    })
  } catch (error: any) {
    DEBUG({ type: 'ERROR', msg: error.message })
    return ResNotFound(ctx)
  }
  if (dirents.find(d => d.name === INDEX_PAGE)) {
    //index存在
    ctx.setAbsolutePath(join(absolutePath!, INDEX_PAGE))
    return ResStatic(ctx)
  }
  let content: string = `<h1>Index of ${relativePath}</h1>`
  dirents.forEach(dirent => {
    let { name } = dirent
    let href: string = join(relativePath!, name)
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
    msg: absolutePath! + ' +' + (Date.now() - startTime!) + 'ms'
  })
}