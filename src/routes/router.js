const fs=require('fs')
const path=require('path')

class Router{
	constructor(){
		this.routes=[]
		this.addRoute()
	}
	addRoute(){
		let projectPath=__dirname.split('src')[0]
		let controllerPath=path.join(projectPath,'/src/controller/')
		fs.readdir(controllerPath,(err,files)=>{
			if(err){
				console.error(JSON.stringify(err))
				return
			}
			files.forEach(item=>{
				let route=require('../controller/'+item)
				this.routes.push(route)
			})
		})
	}

	isExist(req,res){
		const method=req.method.toLowerCase()
		const route=this.routes.filter(item=>{
			return item.method === method && item.path === req.relativePath
		})
		if(route[0]){
			route[0].handler(req,res)
			return true
		}
		return false
	}
}

module.exports=new Router()