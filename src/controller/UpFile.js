const fs=require('fs')
const Utils=require('../modules/Utils')

// @upfile
class UpFile{
	constructor(){
		this.method='post'
		this.path='/upfile'
	}
	handler(req,res){
		console.log(req.headers)
		if(!Utils.hasBody(req)){
			res.end('not file')
		}
		// const boundary=Utils.parseBoundary(req)//拿到数据分隔符
		let buffers=[]
		req.on('data',chunk=>{
			buffers.push(chunk)
		})
		req.on('end',()=>{
			let bufferconcat=Buffer.concat(buffers)
			let len=bufferconcat.length
			console.log(bufferconcat.length)
			console.log(bufferconcat.toString())
			// console.log(bufferconcat.slice(0,138).toString())
		})
		res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
		res.end(JSON.stringify({sucess:true,result:'上传成功'}))
	}
	test(){
		return 'test'
	}
}

module.exports=new UpFile()