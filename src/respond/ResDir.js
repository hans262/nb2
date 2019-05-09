const fs = require('fs')
const path = require('path')
const { INDEX_PAGE } = require('../../config/default')
const ResRedirect = require('./ResRedirect')

function ResDir(req, res) {
  const { absolutePath, relativePath } = req
  const INDEX_PATH = path.join(absolutePath, INDEX_PAGE)//index路径

  if (fs.existsSync(INDEX_PATH)) {
    //重定向一下
    const location = path.join(relativePath, INDEX_PAGE)
    ResRedirect(res, location, 302, 'Index exists')
  } else {
    const files = fs.readdirSync(absolutePath)
    let content = `<h1>Index of ${req.relativePath}</h1>`
    files.forEach(file => {
      let href = path.join(relativePath, file)
      let small = ''
      try {
        const stats = fs.statSync(path.join(absolutePath, file))
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
module.exports = ResDir