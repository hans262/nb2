const url=require('url')
const querystring=require('querystring')
const fs=require('fs')
const Utils=require('../modules/Utils')

module.exports=[
	{
		method:'get',
		path:'/get',
		handler:function(req,res){
			res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
			const DATA=url.parse(req.url,true).query
		  res.end(JSON.stringify(DATA))
		}
	},
	{
		method:'get',
		path:'/jsonp',
		handler:function(req,res){
			res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
			const DATA=url.parse(req.url,true).query
			res.end(`${DATA.callback}(${JSON.stringify(DATA)})`)
		}
	},
	{
		method:'post',
		path:'/post',
		handler:async function(req,res){
			res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
			const data=await req.postdata
			res.end(JSON.stringify(data))
		}
	},
	{
		method:'post',
		path:'/fileup',
		handler:async function(req,res){
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
					console.log(filename)
					var data=bufferconcat.slice(arr[i][3]+2,arr[i][5])
					fs.writeFileSync("./upfiles/"+filename, data)
				}
			})
			res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'})
			res.end(JSON.stringify({sucess:true,result:'上传成功'}))
		}
	},
	{
		method:'post',
		path:'/fileup2',
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
			res.end('123')
		}
	}
]