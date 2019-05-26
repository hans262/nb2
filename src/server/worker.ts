import { createServer } from 'http'
import { PORT, HOST } from '../conf'
import { HANDLER } from './Main'
import { LOG } from '../utils/log'

export async function RUN(): Promise<void> {
  const server = createServer(HANDLER)
  server.listen(PORT, HOST, () => {
    LOG({ type: 'WORKER STARTUP', pid: process.pid, msg: `port: ${PORT}` })
  })
}