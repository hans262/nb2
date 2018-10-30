const url=require('url')
// @jsonp
class Jsonp{
	constructor(){
		this.method='get'
		this.path='/jsonp'
	}
	handler(req,res){
		res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
		const DATA=url.parse(req.url,true).query
		res.end(`${DATA.callback}(${JSON.stringify(DATA)})`)
	}
	test(){
		return 'test'
	}
}

module.exports=new Jsonp()