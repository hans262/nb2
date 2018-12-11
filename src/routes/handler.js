const path=require('path')
const url=require('url')

const config=require('../../config/default')
//class
const Utils=require('../modules/Utils')
const respond=require('../respond/respond')
const router=require('./router')
const login=require('./login')

class Handler{
	constructor(){
		this.root=config.root
    this.loginFlag=config.loginFlag

    this.projectPath=__dirname.split('src')[0]
    this.faviconPath=path.join(this.projectPath,'/public/favicon.ico')
	}
  system(req,res){
    switch(true){
      case req.relativePath==='/login' && req.method==='GET' :
      respond.login(req,res)
      break;
      case req.relativePath==='/loginReq' && req.method==='POST' :
      login.loginReqHandler(req,res)
      break;
      case this.loginFlag && !login.isLogin(req,res) :
      respond.redirect(res,'/login',302,'Temporarily Moved')
      break;
      default :
      this.routeHandler(req,res)
    }
  }
  routeHandler(req,res){
    Utils.setHeaders(res)//设置headers
    switch(true){
      case req.relativePath==='/favicon.ico' && req.method==='GET' :
      req.absolutePath=this.faviconPath
      respond.statics(req,res)
      break;
      case router.next(req,res) :
      break;
      default :
      respond.statics(req,res)
    }
  }
  mount(req,res){
    const UrlParse=url.parse(req.url,true)
    req.relativePath=decodeURI(UrlParse.pathname)//挂载相对路径
    req.absolutePath=decodeURI(path.join(this.root,req.relativePath))//挂载绝对路径

    req.query=UrlParse.query//挂载get数据
    req.postdata=Utils.parsePostData(req)//挂载post数据
    req.cookies=Utils.parseCookie(req.headers.cookie)//挂载cookies
    
    process.send({
      type: 'info',
      pid: process.pid,
      msgtype: 'request',
      msg: req.absolutePath
    })
    this.system(req,res)
  }
}

module.exports=Handler
