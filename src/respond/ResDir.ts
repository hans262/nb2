import { existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import { INDEX_PAGE } from '../conf'
import ResRedirect from './ResRedirect'

export default function ResDir(req, res) {
  const { absolutePath, relativePath } = req
  const INDEX_PATH = join(absolutePath, INDEX_PAGE)//index路径

  if (existsSync(INDEX_PATH)) {
    //重定向一下
    const location: string = join(relativePath, INDEX_PAGE)
    ResRedirect(res, { location, code: 302, reasonPhrase: 'index exists' })
  } else {
    const files = readdirSync(absolutePath)
    let content = `<h1>Index of ${req.relativePath}</h1>`
    files.forEach(file => {
      let href = join(relativePath, file)
      let small = ''
      try {
        const stats = statSync(join(absolutePath, file))
        if (stats.isDirectory()) {
          href += '/'
          file += '/'
        }
      } catch (err) {
        process.send({
          type: 'INFO',
          pid: process.pid,
          msgtype: 'ERROR',
          msg: err.message
        })
        small += `<small style="color:red">无权系统路径</small>`
      }
      content += `<p><a href="${href}">${file}</a>${small}</p>`
    })
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.writeHead(200, 'Access Directory')
    res.end(content)
    process.send({ type: 'INFO', pid: process.pid, msgtype: 'RES_DIR', msg: absolutePath })
  }
}