import { isMaster, fork, on, workers } from 'cluster'
import { cpus } from 'os'
import { CLUSTER } from '../conf'
import { LOG } from '../modules/log'

function master(): void {
  LOG({ type: 'MASTER STARTUP', msg: 'running' })
  CLUSTER ? cpus().forEach(() => fork()) : fork()

  on('message', (worker, action) => {
    switch (action.type) {
      case 'RE_START':
        //重启
        Object.values(workers).forEach((w, i) => {
          setTimeout(() => {
            w.send({ type: 'CLOSE_SERVER', code: 1 })
          }, 2000 * i)
        })
        break
      case 'SHUT_DOWN':
        //关机
        Object.values(workers).forEach(w => {
          w.send({ type: 'CLOSE_SERVER', code: 0 })
        })
        break
      default:
        throw new Error('No MsgType!')
    }
  })

  on('exit', (worker, code) => {
    if (code === 1) {
      //重启
      LOG({ type: 'WORKET EXIT', pid: worker.process.pid, msg: 'restart' })
      fork()
    } else if (code === 0) {
      //关机
      LOG({ type: 'WORKET EXIT', pid: worker.process.pid, msg: 'shutdown' })
    }

  })
}

export async function RUN(): Promise<void> {
  if (isMaster) {
    master()
  } else {
    const { RUN } = await import('./worker')
    RUN()
  }
}