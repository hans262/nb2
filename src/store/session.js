class Session{
	constructor(){
    this.key='session_id'
    this.EXPIRES=20*60*1000//20分钟
    this.createSession()
	}
  createSession(){
    if(SESSIONS) return
    global.SESSIONS={}
  }
	generate(){
    let session={}
    session.id=Date.now()+Math.random()
    session.cookie={
      expire:Date.now()+this.EXPIRES,
      count:0
    }
    SESSIONS[session.id]=session
    return session
  }
  reset(id){
    const session=SESSIONS[id]
  	session.cookie.expire=Date.now()+this.EXPIRES
  	session.cookie.count++
  }
  delete(id){
  	delete SESSIONS[id]
  }
  select(id){
    const session=SESSIONS[id]
    return session ? session : null
  }
}
module.exports=new Session()