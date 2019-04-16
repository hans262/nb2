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
	marster(){
		console.info(`[master] pid: ${process.pid} -> master process started`)
		//衍生子进程
		if(this.isCluster){
			cpus.forEach(()=>cluster.fork())
		}else{
			cluster.fork()
		}

		cluster.on('message',(worker, action)=>{
			switch(action.type){
				case 'info':
					const { pid, msg, msgtype }=action
					const nowTime=new Date().toLocaleString()
					console.info(`[${msgtype}] pid: ${pid} date: ${nowTime} -> ${msg}`)
					break
				case 'RE_START':
					//重启
					Object.values(cluster.workers).forEach((w,i)=>{
						setTimeout(()=>{
							w.send({type:'CLOSE_SERVER', code:1})
						},2000*i)
					})
					break
				case 'SHUT_DOWN':
					//关机
					Object.values(cluster.workers).forEach(w=>{
						w.send({type:'CLOSE_SERVER', code:0})
					})
					break
				default:
					throw new Error('No MsgType!')
			}
		})

		cluster.on('exit',(worker, code)=>{
			console.info(`[worker] pid: ${worker.process.pid} -> worker process exited`)
			if(code===1){
				//重启
				cluster.fork()
			}
		})
	}
	worker(){
		const server=http.createServer((req,res)=>{
			handler.mount(req,res)
		})

		server.listen(this.port,this.host,()=>{
		  process.send({
		  	type: 'info',
		  	pid: process.pid,
		  	msgtype: 'worker',
		  	msg: `worker server started on port: ${this.port}`
		  })
		})

		process.on('message', action=>{
			switch(action.type){
				case 'CLOSE_SERVER':
					//平滑关闭server
					const { code }=action
					setTimeout(()=>{
						process.exit(code)
					},10000)
					server.close()
					break
				default:
					throw new Error('No MsgType!')
			}
		})

	}
	start(){
		cluster.isMaster ? this.marster() : this.worker()
	}
}

module.exports=Server
