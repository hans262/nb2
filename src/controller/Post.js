// @post
class Post{
	constructor(){
		this.method='post'
		this.path='/post'
	}
	async handler(req,res){
		res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
		const data=await req.postdata
		res.end(JSON.stringify(data))
	}
	test(){
		return 'test'
	}
}

module.exports=new Post()