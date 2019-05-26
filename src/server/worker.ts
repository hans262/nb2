import { createServer } from 'http'
import { PORT, HOST } from '../conf'
import { HANDLER } from './Main'

export async function RUN(): Promise<void> {
  const server = createServer(HANDLER)
  
  server.listen(PORT, HOST, () => {
    process.send({ type: 'INFO', pid: process.pid, msgtype: 'WORKER STARTUP', msg: `port: ${PORT}` })
  })
}