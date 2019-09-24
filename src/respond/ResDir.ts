import { Dirent, readdirSync } from 'fs';
import { ServerResponse } from 'http';
import { join } from 'path';
import { INDEX_PAGE } from '../configure';
import { Req } from '../Interface/Req';
import { DEBUG } from '../modules/logger';
import { ResStatic } from './ResStatic';
import { ResNotFound } from './ResNotFound';

export function ResDir(req: Req, res: ServerResponse): void {
  const { __absolutePath, __relativePath } = req
  let dirents: Array<Dirent>
  try {
    dirents = readdirSync(__absolutePath!, {
      withFileTypes: true
    })
  } catch (error) {
    DEBUG({ type: 'ERROR', msg: error.message })
    return ResNotFound(req, res)
  }
  if (dirents.find(d => d.name === INDEX_PAGE)) {
    //index存在
    req.__absolutePath = join(__absolutePath!, INDEX_PAGE)
    return ResStatic(req, res)
  }
  let content: string = `<h1>Index of ${__relativePath}</h1>`
  dirents.forEach(dirent => {
    let { name } = dirent
    let href: string = join(__relativePath!, name)
    if (dirent.isDirectory()) {
      href += '/'
      name += '/'
    }
    content += `<p><a href="${href}">${name}</a></p>`
  })
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.writeHead(200, 'Access Directory')
  res.end(content)
  DEBUG({ type: 'RES_DIR', msg: __absolutePath! })
}