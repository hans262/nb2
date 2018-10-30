const Utils=require('../modules/Utils')
const session=require('./session')

class Login{
	constructor(){}
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
}

module.exports=new Login()