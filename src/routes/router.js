const fs=require('fs')
const path=require('path')

class Router{
	constructor(){
		this.routes=[]
		this.addRoute()
		this.handler=null
	}
	addRoute(){
		let sourcePath=__dirname.split('src')[0]
		let controllerPath=path.join(sourcePath,'/src/controller/')
		fs.readdir(controllerPath,(err,files)=>{
			if(err){
				console.error(JSON.stringify(err))
				return
			}
			files.forEach(f=>{
				let route=require('../controller/'+f)
				this.routes.push(route)
			})
		})
	}

	isHit(req){
		const { method, relativePath }=req
		const route=this.routes.filter(r=>r.method === method && r.path === relativePath)
		if(route.length){
			const { handler }=route[0]
			this.handler=handler
			return true
		}
		return false
	}
}

module.exports=new Router()