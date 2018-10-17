const http=require('http')
const config=require('../config/default')
const handler=new (require('./routes/handler'))

const server=http.createServer()
server.on('request',(req,res)=>handler.mount(req,res))
server.listen(config.port,config.hostname,()=>{
	process.send({type:'info',msg:`[process] pid: ${process.pid} -server: started port: ${config.port}`})
})

process.on('message', message=>{
	if(message.type==='shutdown'){
		server.close()//优雅关闭server
		process.send({type:'closed',msg:'closed'})
	}
})