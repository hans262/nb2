const { mime } = require('../utils/mime')
const { ResZip } = require('./ResZip')
const { ResRange } = require('./ResRange')
const { CACHE_MAX_AGE } = require('../../config/default')
const { generateETag, isCache } = require('../utils/cache')
const ResCache=require('./ResCache')

function ResFile(req, res) {
  const { absolutePath, stats } = req
  const { size, mtime } = stats

  //判断缓存
  if(isCache(req)){
    return ResCache(req,res)
  }
  
  //文件最后修改时间
  res.setHeader('Last-Modified', mtime.toUTCString())
  //到期时间
  const expire = (new Date(Date.now() + CACHE_MAX_AGE * 1000)).toUTCString()
  res.setHeader('Expires', expire)
  //实现缓存机制
  res.setHeader('Cache-Control', `public, max-age=${CACHE_MAX_AGE}`)
  //资源关联记号
  res.setHeader('ETag', generateETag(stats))

  //mime类型
  res.setHeader('Content-Type', mime(absolutePath) + '; charset=utf-8')
  //内容大小
  res.setHeader('Content-Length', size)

  if (req.headers['range']) {
    //范围请求
    ResRange(req, res)
  } else {
    //不是范围请求
    ResZip(req, res)
  }
}
module.exports = ResFile