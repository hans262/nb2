const getCookie=require('../utils/getCookie')
const setCookie=require('../utils/getCookie')
const session=require('../server/session')
const redirect=require('../respond/redirect')

function CheckLogin(req, res, next){
  if(check(req,res)){
    next()
  }else{
    redirect(res,'/login',302,'Temporarily Moved')
  }
}

function check(req,res){
  let id=getCookie(req,session.KEY)
  if(!id) return false //id不存在
  const ses=session.select(id)//-查询
  if(!ses){
    //session不存在
    setCookie(res,session.KEY,'delete',{
      path:'/',
      expires:new Date(),
      httpOnly:true
    })
    return false
  }
  if(ses.expire < Date.now()){
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
  return true
}

module.exports=CheckLogin