const fs=require('fs')
const path=require('path')

const config=require('../../config/default')
const respondNotFound=require('../views/NotFound')
const respondLogin=require('../views/LoginPage')
const mime=require('./mime')

//class
const Zip=require('./zip')
const Cache=require('./cache')

class Respond{
	constructor(){
		this.indexPage=config.indexPage
		this.zip=new Zip(config.zipMatch)
		this.cache=new Cache(config.cache)
	}
	login(req,res){
		respondLogin(req,res)
	}
	redirect(res,location,code,reasonPhrase){
		process.send({
			type: 'info',
      pid: process.pid,
      msgtype: 'info',
      msg: 'Request Redirect'
		})
	  res.setHeader('Location',location)
	  res.writeHead(code,reasonPhrase)
	  res.end('reasonPhrase')
	}
	notModified(res){
		process.send({
			type: 'info',
      pid: process.pid,
      msgtype: 'info',
      msg: 'ReadFile IsCached'
		})
		res.writeHead(304,'Not Modified')
  	res.end('Not Modified')
	}
	statics(req,res){
		if(req.absolutePath.endsWith('\\')){
      this.directory(req,res)
    }else{
      this.isCache(req,res)
    }
	}
	isCache(req,res){
		fs.stat(req.absolutePath,(err,stats)=>{
			if(err){
				return respondNotFound(req,res)
			}
			if(stats.isDirectory()){
				this.redirect(res,req.relativePath+'/',301,'Moved Permanently')
			}else{
        this.cache.setFreshHeaders(stats,res)
        if(this.cache.isFresh(req,res)){
          this.notModified(res)
        }else{
          this.file(req,res,stats)
        }
			}
		})
	}
	file(req,res,stats){
  	res.setHeader('Content-Type', mime(req.absolutePath)+'; charset=utf-8')
  	res.setHeader('Accept-Ranges','bytes')
    res.setHeader('Connection','keep-alive')
    res.setHeader('Transfer-Encoding','chunked')
    req.stats=stats
    this.zip.respond(req,res)
	}
	directory(req,res){
		fs.stat(req.absolutePath,(err,stats)=>{
			if(err || !stats.isDirectory()){
				return respondNotFound(req,res)
			}
			const indexPath=decodeURI(path.join(req.absolutePath,this.indexPage))//index路径
			if(fs.existsSync(indexPath)){
				req.absolutePath=indexPath
				this.isCache(req,res)
			}else{
				fs.readdir(req.absolutePath,(err,files)=>{
					if(err){
          	res.writeHead(500,'Server Error')
          	return res.end(JSON.stringify(err))
          }
					let content=`<h1>Index of ${req.relativePath}</h1>`
					files.forEach(file=>{
						let itemLink=path.join(req.relativePath,file)
						let small=''
						try{
							if(fs.statSync(path.join(req.absolutePath,file)).isDirectory()){
								itemLink=path.join(itemLink,'/')
							}
						}catch(err){
							process.send({
								type: 'info',
					      pid: process.pid,
					      msgtype: 'error',
					      msg: JSON.stringify(err)
							})
							small+=`<small style="color:red">此路径没有可读权限</small>`
						}
	          content+=`<p><a href='${itemLink}'>${file}</a>${small}</p>`
					})
					res.setHeader('Content-Type','text/html;charset=utf-8')
					res.writeHead(200,'Access Directory')
	        res.end(content)
				})
			}
		})
	}
}

module.exports=new Respond()