const http=require('http')
const cluster=require('cluster')//多核cpu集群
const cpus=require('os').cpus()

const config=require('../config/default')
const handler=require('./routes/handler')

class Server{
	constructor(){
		this.port=config.port
  	this.host=config.host
  	this.isCluster=config.isCluster
	}
	createServer(){
		const server=http.createServer()
		server.on('request',(req,res)=>handler.mount(req,res))
		server.listen(this.port,this.host,()=>{
		  process.send({
		  	type: 'info',
		  	pid: process.pid,
		  	msgtype: 'server',
		  	msg: `server is started on port: ${this.port}`
		  })
		})
		return server
	}
	marster(){
		console.info(`[process] pid: ${process.pid} -> main process is running`)
		//衍生process
		if(this.isCluster){for(let cpu of cpus) cluster.fork()}else{cluster.fork()}

		cluster.on('message',(worker,message,handle)=>{
			//收到closed server，断开与主进程IPC管道
			if(message.type==='closed') worker.disconnect()
			if(message.type==='info'){
				console.info(
					`[${message.msgtype}] pid: ${message.pid} -> ${message.msg}`
				)
			}
		})
		cluster.on('disconnect',worker=>{
			//监听是否与主进程断开，然后杀死子进程
			worker.kill()
		})
		cluster.on('exit',(worker,code,signal)=>{
			console.info(`[process] pid: ${worker.process.pid} -> process is exited`)
			cluster.fork()
		})
	}
	worker(){
		const server=this.createServer()
		process.on('message', message=>{
			if(message.type==='shutdown'){
				server.close()//优雅关闭server
				process.send({type:'closed',msg:'closed'})
			}
		})
	}
	start(){
		cluster.isMaster ? this.marster() : this.worker()
	}
}

module.exports=Server
