const fs=require('fs')

// @upimg
class UpImg{
	constructor(){
		this.method='post'
		this.path='/upimg'
	}
	async handler(req,res){
		let chunks=[]
		let bufferconcat
		let size=0
		req.on('data',chunk=>{
			chunks.push(chunk)
			size+=chunk.length
		})
		var arr=[]
		req.on('end',()=>{
			bufferconcat=Buffer.concat(chunks,size)
			let temp=[]
			let p=0
			for(let i=0;i<bufferconcat.length;i++){
				if(bufferconcat[i].toString() == 13 && bufferconcat[i+1].toString() == 10){
					p+=1
					if(p<=6){
						temp.push(i)
					}else{
						arr.push(temp)
						temp=[]
						p=1
						temp.push(i)
					}
				}
			}
			// console.log(arr)
			let arrlen=arr.length
			// 0-5 6-11 len 7 13 19
			for(let i=0;i<arrlen;i++){
				var name=bufferconcat.slice(arr[i][0],arr[i][1]).toString().split(';')[2].split('=')[1]
				let filename=name.split('\"')[1]
				console.info(filename)
				var data=bufferconcat.slice(arr[i][3]+2,arr[i][5])
				fs.writeFileSync("./upfiles/"+filename, data)
			}
		})
		res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
		res.end(JSON.stringify({sucess:true,result:'上传成功'}))
	}
	test(){
		return 'test'
	}
}

module.exports=new UpImg()