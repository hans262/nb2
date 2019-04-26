const session=require('./session')
const MIDDLEWARES=[]

function use(middleware){
  MIDDLEWARES.push(middleware)
}

use(require('../middleware/Mount'))
use(require('../middleware/Login'))
use(require('../middleware/GetToken'))
use(require('../middleware/CheckLogin'))


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