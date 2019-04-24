const url=require('url')
const path=require('path')
const conf=require('../../config/default')
const setHeader=require('../utils/setHeader')
const { ROOT }=conf

function mount(req,res,next){
  const urlObj=url.parse(req.url,true)
  req.relativePath=decodeURI(urlObj.pathname)//相对路径
  req.absolutePath=decodeURI(path.join(ROOT,req.relativePath))//绝对路径
  req.query=urlObj.query//get数据
  setHeader(res)
  
  process.send({
    type: 'INFO',
    pid: process.pid,
    msgtype: 'REQUEST',
    msg: req.absolutePath
  })
  next()
}
module.exports=mount