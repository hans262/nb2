const querystring=require('querystring')
const Utils=require('../modules/Utils')

// @post
class Post{
	constructor(){
		this.method='post'
		this.path='/api/post'
	}
	async handler(req,res){
		res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
		const data=await Utils.parsePostData(req)
		res.end(data)
	}
	test(){
		return 'test'
	}
}

module.exports=new Post()