const http=require('http')
const cpus=require('os').cpus()
const cluster=require('cluster')
const session=require('./session')
const sessions=session.sessions
sessions[1539158629496.9731]={
	id: 1539158629496.9731,
	cookie: { expire: 1539159829497, count: 0 }
}
if(cluster.isMaster){
	console.info(`[main process] pid: ${process.pid} is Running`)
	cluster.fork()
	cluster.on('listening',(worker,address)=>{
		console.info(`[process] pid: ${worker.process.pid} -id: ${worker.id} is Running`)
	})
	cluster.on('message',(worker,message,handle)=>{
		if(message.type==='info') console.info(message.msg)
		if(message.type==='session'){
			let method=message.msg.split('/')[0]
			let arg=message.msg.split('/')[1]
			let ren=session[method](arg)
			worker.send({type:'session',msg:ren})//发送关闭命令
		}
	})
}else{
	const server=http.createServer()
	server.on('request',(req,res)=>{
		process.send({type:'session',msg:'select/1539158629496.9731'})
		process.on('message', message=>{
			if(message.type==='session'){
				console.log(message.msg)
			}
		})
		res.end('Hello World')
	})
	server.listen(3000,'127.0.0.1',()=>{
		process.send({type:'info',msg:`[process] pid: ${process.pid} -server: started port: 3000`})
	})
	// process.send({type:'session',msg:'generate/0'})
	
}

