const SESSION={}
const KEY='SESSION_ID'
const EXPIRES=20*60*1000//20分钟

function generate(){
  const session={
    id:Date.now()+Math.random(),
    expire:Date.now()+EXPIRES,
    count:0
  }
  SESSION[session.id]=session
  return session
}

function reset(id){
  const session=SESSION[id]
  session.expire=Date.now()+EXPIRES
  session.count++
}

function remove(id){
  delete SESSION[id]
}

function select(id){
  return SESSION[id]
}

module.exports={
  SESSION,
  KEY,
  EXPIRES,
  generate,
  reset,
  remove,
  select
}