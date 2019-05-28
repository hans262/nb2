import { Server } from 'ws'
const wss: Server = new Server({ port: 8888 })

wss.on('connection', function (ws) {
  ws.send('you are user ' + wss.clients.size)
  ws.on('message', function (msg) {
    console.log(msg)
    wss.clients.forEach(client => {
      client.send(msg)
    })
  })
})