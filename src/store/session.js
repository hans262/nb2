class Session{
	constructor(){
    this.key='session_id'
    this.EXPIRES=20*60*1000//20分钟
    this.createSession()
	}
  createSession(){
    if(global.sessions) return
    global.sessions={}
  }
	generate(){
    let session={}
    session.id=Date.now()+Math.random()
    session.cookie={
      expire:Date.now()+this.EXPIRES,
      count:0
    }
    sessions[session.id]=session
    return session
  }
  reset(id){
    const session=sessions[id]
  	session.cookie.expire=Date.now()+this.EXPIRES
  	session.cookie.count++
  }
  delete(id){
  	delete sessions[id]
  }
  select(id){
    const session=sessions[id]
    return session ? session : null
  }
}
module.exports=new Session()