import { Dirent, readdirSync } from 'fs';
import { ServerResponse } from 'http';
import { join } from 'path';
import { INDEX_PAGE } from '../conf';
import { Req } from '../Interface/Req';
import { LOG } from '../modules/log';
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
    LOG({ type: 'ERROR', msg: error.message })
    return ResNotFound(req, res)
  }
  if (dirents.find(d => d.name === INDEX_PAGE)) {
    //index存在
    req.__absolutePath = join(__absolutePath!, INDEX_PAGE)
    return ResStatic(req, res)
  }
  let content: string = `<h1>Index of ${__relativePath}</h1>`
  dirents.forEach(file => {
    let { name } = file
    let href: string = join(__relativePath!, name)
    if (file.isDirectory()) {
      href += '/'
      name += '/'
    }
    content += `<p><a href="${href}">${name}</a></p>`
  })
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.writeHead(200, 'Access Directory')
  res.end(content)
  LOG({ type: 'RES_DIR', msg: __absolutePath! })
}