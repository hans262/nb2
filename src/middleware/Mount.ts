import { parse } from 'url'
import { join } from 'path'
const conf = require('../../config/default')
const setHeader = require('../utils/setHeader')
const { ROOT } = conf

export default function Mount(req, res, next) {
  const { pathname, query } = parse(req.url, true)
  //相对路径
  req.relativePath = decodeURI(pathname)
  //绝对路径
  req.absolutePath = decodeURI(join(ROOT, req.relativePath))
  //查询字符串
  req.query = query
  //常用header
  setHeader(res)
  
  process.send({ type: 'INFO', pid: process.pid, msgtype: 'REQUEST', msg: req.absolutePath })
  next()
}