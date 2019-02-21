const querystring=require('querystring')

// @post
class Post{
	constructor(){
		this.method='post'
		this.path='/api/post'
	}
	async handler(req,res){
		res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
		const data=await req.postdata
		res.end(JSON.stringify(querystring.parse(data)))
	}
	test(){
		return 'test'
	}
}

module.exports=new Post()