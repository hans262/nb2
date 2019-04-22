// @post
class Post{
	constructor(){
		this.method='POST'
		this.path='/api/post'
	}
	async handler(req,res){
		res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
		let chunks=[]
		req.on('data',chunk=>{
			chunks.push(chunk)
		})
		req.on('end',()=>{
			const buffer=Buffer.concat(chunks)
			res.end(buffer)
		})
	}
}

module.exports=new Post()