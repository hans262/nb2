import { Server } from 'ws';
import { WEB_SOCKET_PORT } from '../conf';

function RUN(): void {
  const wss: Server = new Server({ port: WEB_SOCKET_PORT })
  wss.on('connection', ws => {
    const userId = wss.clients.size
    console.log(`用户 ${userId} 进来了`)
    ws.send(`你是用户： ${userId}`)
    ws.on('message', msg => {
      console.log(msg)
      wss.clients.forEach(client => {
        client.send(msg)
      })
    })
  })
}
RUN()