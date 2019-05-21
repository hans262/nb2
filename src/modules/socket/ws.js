const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8888 })

wss.on('connection', function (ws) {
  ws.send('you are user ' + wss.clients.size)
  ws.on('message', function (msg) {
    console.log(msg)
    wss.clients.forEach(client => {
      client.send(msg)
    })
  })
})