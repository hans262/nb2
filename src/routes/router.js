const user=require('../controller/user')
const config=require('../../config/default')

class Router{
	constructor(){
		this.METHODS=config.METHODS
		this.routes=[]
		this.pushMethod()
		this.pushRoutes()
	}
	pushMethod(){
		this.METHODS.forEach(item=>{
	    const method=item.toLowerCase()
	    this[item]=function(path,fn){
	    	this.routes.push({method, path, handler:fn})
	    }
		})
	}
	pushRoutes(){
		user.forEach(items=>{
			this.routes.push(items)
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