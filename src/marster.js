const cpus=require('os').cpus()
const cluster=require('cluster')
const config=require('../config/default')

cluster.setupMaster({
  exec: 'worker.js',
  args: ['--use', 'http'],
  silent: true
})
console.info(`[main process] pid: ${process.pid} is Running`)
if(config.isProcess){for(let cpu of cpus) cluster.fork()}else{cluster.fork()}

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