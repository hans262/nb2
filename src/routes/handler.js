const path=require('path')
const url=require('url')

const config=require('../../config/default')
const resLogin=require('../middleware/Login')
//class
const Utils=require('../modules/Utils')
const respond=require('../respond/respond')
const router=require('./router')
const login=require('./login')

class Handler{
	constructor(){
		this.root=config.root
    this.loginVerify=config.loginVerify

    this.projectPath=__dirname.split('src')[0]
    this.faviconPath=path.join(this.projectPath,'/public/favicon.ico')
	}

  routeHandler(req,res){
    Utils.setHeaders(res)
    const { method, relativePath }=req
    switch(true){
      case relativePath===resLogin.path && method===resLogin.method :
        resLogin.handler(req,res)
      break;
      case relativePath==='/loginReq' && method==='POST' :
        login.loginReqHandler(req,res)
      break;
      case this.loginVerify && !login.isLogin(req,res) :
        respond.redirect(res,'/login',302,'Temporarily Moved')
      break;
      case relativePath==='/favicon.ico' && method==='GET' :
        req.absolutePath=this.faviconPath
        respond.statics(req,res)
      break;
      case router.isHit(req) :
        router.handler(req,res)
      break;
      default :
        respond.statics(req,res)
    }
  }

  mount(req,res){
    const urlObj=url.parse(req.url,true)

    req.relativePath=decodeURI(urlObj.pathname)//相对路径
    req.absolutePath=decodeURI(path.join(this.root,req.relativePath))//绝对路径

    req.query=urlObj.query//get数据
    req.cookies=Utils.parseCookie(req.headers.cookie)//cookies
    
    process.send({
      type: 'info',
      pid: process.pid,
      msgtype: 'request',
      msg: req.absolutePath
    })
    this.routeHandler(req,res)
  }
}

module.exports=new Handler()
