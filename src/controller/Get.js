// @get
class Get{
	constructor(){
		this.method='GET'
		this.path='/api/get'
	}
	handler(req,res){
		res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
		const { query }=req
		res.end(JSON.stringify(query))
	}
}

module.exports=new Get()