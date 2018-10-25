const path=require('path')
const url=require('url')

const config=require('../../config/default')
//class
const Utils=require('../modules/Utils')
const respond=require('../respond/respond')
const router=require('./router')
const session=require('./session')

class Handler{
	constructor(){
		this.root=config.root
    this.loginFlag=config.loginFlag
    this.projectPath=__dirname.split('src')[0]
	}
  isLogin(req,res){
    let id=req.cookies[session.key]
    if(!id) return false //id不存在
    req.session=session.select(id)//-查询
    if(!req.session){
      //session不存在
      res.setHeader('Set-Cookie',Utils.serialize(session.key,'delete',{
        path:'/',
        expires:new Date(),
        httpOnly:true
      }))
      return false
    }
    if(req.session && req.session.cookie.expire < Date.now()){
      //超时
      session.delete(id)//-删除
      res.setHeader('Set-Cookie',Utils.serialize(session.key,'delete',{
        path:'/',
        expires:new Date(),
        httpOnly:true
      }))
      return false //转到登陆
    }
    session.reset(id)//-重置
    // process.send({type:'info',msg:session.sessions})
    return true
  }
  system(req,res){
    switch(true){
      case req.relativePath==='/favicon.ico' && req.method==='GET' :
      let faviconPath=path.join(this.projectPath,'/static/logo.ico')
      req.absolutePath=faviconPath
      respond.statics(req,res)
      break;
      case req.relativePath==='/login' && req.method==='GET' :
      respond.login(req,res)
      break;
      case req.relativePath==='/loginReq' && req.method==='POST' :
      this.loginReqHandler(req,res)
      break;
      case this.loginFlag && !this.isLogin(req,res) :
      respond.redirect(res,'/login',302,'Temporarily Moved')
      break;
      default :
      this.routeHandler(req,res)
    }
  }
  routeHandler(req,res){
    Utils.setHeaders(res)//设置常用headers
    switch(true){
      case req.relativePath.startsWith('/static/') || req.relativePath==='/static' :
      let staticPath=path.join(this.projectPath,req.relativePath)
      req.absolutePath=staticPath
      respond.statics(req,res)
      break;
      case router.next(req,res) :
      break;
      default :
      respond.statics(req,res)
    }
  }
  async loginReqHandler(req,res){
    const data=await req.postdata
    /*
      验证账号密码是否正确
      生成session
      设置session_id
      返回登陆成功
      客户端跳转首页
    */
    if(data){
      req.session=session.generate()//-生成
      res.setHeader('Set-Cookie',Utils.serialize(session.key,req.session.id,{
        path:'/',
        expires:new Date(Date.now()+session.EXPIRES),
        httpOnly:true,
      }))
      res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
      res.end(JSON.stringify({success:true,result:'登陆成功'}))
    }
  }
  mount(req,res){
    const UrlParse=url.parse(req.url,true)
    req.relativePath=decodeURI(UrlParse.pathname)//挂载相对路径
    req.absolutePath=decodeURI(path.join(this.root,req.relativePath))//挂载绝对路径

    req.query=UrlParse.query//挂载get数据
    req.postdata=Utils.parsePostData(req)//挂载post数据
    req.cookies=Utils.parseCookie(req.headers.cookie)//挂载cookies
    
    process.send({type:'info',msg:`[process] pid: ${process.pid} -req: ${req.absolutePath}`})
    this.system(req,res)
  }
}

module.exports=Handler
