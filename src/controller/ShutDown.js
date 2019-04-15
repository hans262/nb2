// @restart 关机
class ShutDown{
	constructor(){
		this.method='get'
		this.path='/api/shutdown'
	}
	handler(req,res){
		res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
    res.end(`服务器将在10s后关闭！`)
    process.send({type: 'shutdown'})
	}
	test(){
		return 'test'
	}
}

module.exports=new ShutDown()
