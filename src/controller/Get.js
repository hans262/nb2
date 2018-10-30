const url=require('url')
// @get
class Get{
	constructor(){
		this.method='get'
		this.path='/get'
	}
	handler(req,res){
		res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
		const DATA=url.parse(req.url,true).query
	  res.end(JSON.stringify(DATA))
	}
	test(){
		return 'test'
	}
}

module.exports=new Get()