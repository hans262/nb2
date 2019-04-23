class Session{
	constructor(){
		this.SESSIONS={}
    this.KEY='SESSION_ID'
    this.EXPIRES=20*60*1000//20分钟
	}
	generate(){
    const session={
      id:Date.now()+Math.random(),
      expire:Date.now()+this.EXPIRES,
      count:0
    }
    this.SESSIONS[session.id]=session
    return session
  }
  reset(id){
    const session=this.SESSIONS[id]
  	session.expire=Date.now()+this.EXPIRES
  	session.count++
  }
  delete(id){
  	delete this.SESSIONS[id]
  }
  select(id){
    return this.SESSIONS[id]
  }
}

module.exports=new Session()