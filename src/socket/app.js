const http=require('http')
const url=require('url')
const fs=require('fs')
const ws=require('ws')

const server=http.createServer((req,res)=>{
	const reqObj=url.parse(req.url,true)
	const relativePath=reqObj.pathname
	fs.readFile('./'+relativePath,(err,data)=>{
    if(err) res.end(JSON.stringify(err))
		else res.end(data)
	})
}).listen(3000)

const WebSocketServer=ws.Server
const wss=new WebSocketServer({server})

wss.on('connection',function(ws,req){
  ws.send('you are user '+ wss.clients.size)
  // console.log(req.headers)
  const location=url.parse(req.url,true)
  ws.user=location.query.user
  if(!ws.user){
    ws.close(4001,'Invalid user')
  }
})

wss.on('connection',function(ws){
  ws.on('message',function(msg){
    if(msg){
      wss.clients.forEach(client=>{
          client.send(msg)
      })
    }
  })
})
