const url = require('url')
const path = require('path')
const conf = require('../../config/default')
const setHeader = require('../utils/setHeader')
const { ROOT } = conf

function Mount(req, res, next) {
  const { pathname, query } = url.parse(req.url, true)
  //相对路径
  req.relativePath = decodeURI(pathname)
  //绝对路径
  req.absolutePath = decodeURI(path.join(ROOT, req.relativePath))
  //查询字符串
  req.query = query
  //常用header
  setHeader(res)

  process.send({ type: 'INFO', pid: process.pid, msgtype: 'REQUEST', msg: req.absolutePath })
  next()
}
module.exports = Mount