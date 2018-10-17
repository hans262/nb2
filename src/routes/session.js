class Session{
	constructor(){
		this.sessions={}
    this.key='session_id'
    this.EXPIRES=20*60*1000//20分钟
	}
	generate(){
    let session={}
    session.id=Date.now()+Math.random()
    session.cookie={
      expire:Date.now()+this.EXPIRES,
      count:0
    }
    this.sessions[session.id]=session
    return session
  }
  reset(id){
    const session=this.sessions[id]
  	session.cookie.expire=Date.now()+this.EXPIRES
  	session.cookie.count++
  }
  delete(id){
  	delete this.sessions[id]
  }
  select(id){
    const session=this.sessions[id]
    return session ? session : null
  }
}
module.exports=new Session()