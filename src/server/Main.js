const MIDDLEWARES=[]

function use(middleware){
  MIDDLEWARES.push(middleware)
}

const mount=require('../middleware/mount')
use(mount)

use(function(req,res,next){
  const { method, relativePath }=req
  if(method==='GET' && relativePath==='/login'){
    
  }else{
    next()
  }
})

use(function(req,res,next){
  res.end('C')
  // next()
})

function handler(req,res){
  let i=0
  function next(){
    let middleware=MIDDLEWARES[i++]
    if(!middleware) return
    middleware(req,res,next)
  }
  next()
}

module.exports={
  use,
  handler
}