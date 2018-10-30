//abc
class abc{
	constructor(){
		this.method='get'
		this.path='/abc'
	}
	handler(req,res){
		res.end(this.test())
	}
	test(){
		return 'test'
	}
}

module.exports=new abc()