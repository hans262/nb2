const fs=require('fs')
const path=require('path')
const config=require('../../config/default')

class Router{
	constructor(){
		this.METHODS=config.METHODS
		this.routes=[]
		// this.AddMethod()
		this.AddRoutes()
	}
	AddMethod(){
		this.METHODS.forEach(item=>{
	    const method=item.toLowerCase()
	    this[item]=function(path,fn){
	    	this.routes.push({method, path, handler:fn})
	    }
		})
	}
	AddRoutes(){
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
	next(req,res){
		const method=req.method.toLowerCase()
		for(let v of this.routes){
			if(v.method === method && v.path === req.relativePath){
				v.handler(req,res)
				return true
			}
		}
		return false
	}
}

module.exports=new Router()