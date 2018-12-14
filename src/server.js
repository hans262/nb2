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
		return server
	}
	marster(){
		console.info(`[process] pid: ${process.pid} -> main process is running`)
		//衍生子进程
		if(this.isCluster){for(let cpu of cpus) cluster.fork()}else{cluster.fork()}

		cluster.on('message',(worker,message,handle)=>{
			//收到server closed ，断开与主进程IPC管道
			if(message.type==='close') worker.disconnect()
			if(message.type==='info'){
				console.info(
					`[${message.msgtype}] pid: ${message.pid} date: ${new Date()} -> ${message.msg}`
				)
			}
		})
		cluster.on('disconnect',worker=>{
			//监听与主进程IPC管道断开,然后kill子进程
			worker.kill()
		})
		cluster.on('exit',(worker,code,signal)=>{
			console.info(`[process] pid: ${worker.process.pid} -> process is exited`)
			cluster.fork()
		})
	}
	worker(){
		const server=this.createServer()

		server.listen(this.port,this.host,()=>{
		  process.send({
		  	type: 'info',
		  	pid: process.pid,
		  	msgtype: 'server',
		  	msg: `server is started on port: ${this.port}`
		  })
		})

		process.on('message', message=>{
			if(message.type==='shutdown'){
				server.close()//停止接收新的连接
				process.send({type:'close',msg:'closed'})
			}
		})
		
	}
	start(){
		cluster.isMaster ? this.marster() : this.worker()
	}
}

module.exports=Server
