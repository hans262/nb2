import { readdirSync, statSync } from 'fs';
import { ServerResponse } from 'http';
import { join } from 'path';
import { INDEX_PAGE } from '../conf';
import { Req } from '../Interface/Req';
import { LOG } from '../modules/log';
import { ResVerify } from './ResVerify';

export function ResDir(req: Req, res: ServerResponse): void {
  const { __absolutePath, __relativePath } = req
  const files: Array<string> = readdirSync(__absolutePath)

  if (files.includes(INDEX_PAGE)) {
    //index存在
    req.__absolutePath=join(__absolutePath, INDEX_PAGE)
    req.__stats= statSync(req.__absolutePath)
    return ResVerify(req,res)
  }

  let content: string = `<h1>Index of ${__relativePath}</h1>`
  files.forEach(file => {
    let href: string = join(__relativePath, file)
    let small: string = ''
    try {
      const stats = statSync(join(__absolutePath, file))
      if (stats.isDirectory()) {
        href += '/'
        file += '/'
      }
    } catch (err) {
      LOG({ type: 'ERROR', msg: err.message })
      small += `<small style="color:red">无权系统路径</small>`
    }
    content += `<p><a href="${href}">${file}</a>${small}</p>`
  })
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.writeHead(200, 'Access Directory')
  res.end(content)
  LOG({ type: 'RES_DIR', msg: __absolutePath })
}