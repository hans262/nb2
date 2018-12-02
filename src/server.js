const http=require('http')
const cluster=require('cluster')//多核cpu集群
const cpus=require('os').cpus()

const config=require('../config/default')
const handler=new (require('./routes/handler'))


class Server{
	constructor(){
		this.port=config.port
  	this.hostname=config.host
  	this.isProcess=config.isProcess
	}
	createServer(){
		const server=http.createServer()
		server.on('request',(req,res)=>handler.mount(req,res))
		server.listen(this.port,this.hostname,()=>{
		  process.send({type:'info',msg:`[process] pid: ${process.pid} -server: started port: ${this.port}`})
		})
		return server
	}
	marster(){
		console.info(`[main process] pid: ${process.pid} is Running`)
		//衍生process
		if(this.isProcess){for(let cpu of cpus) cluster.fork()}else{cluster.fork()}
		//每个子进程创建后，触发
		cluster.on('listening',(worker,address)=>{
			console.info(`[process] pid: ${worker.process.pid} -id: ${worker.id} is Running`)
			// worker.send({type:'shutdown',msg:'shutdown'})//发送关闭命令
    })
		cluster.on('message',(worker,message,handle)=>{
			//收到closed server，断开与主进程IPC管道
			if(message.type==='closed') worker.disconnect()
			if(message.type==='info') console.info(message.msg)
		})
		cluster.on('disconnect',worker=>{
			//监听是否与主进程断开，然后杀死子进程
			worker.kill()
		})
		cluster.on('exit',(worker,code,signal)=>{
			console.info(`[process] pid: ${worker.process.pid} is Exited`)
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
	main(){
		cluster.isMaster ? this.marster() : this.worker()
	}
}

module.exports=Server
