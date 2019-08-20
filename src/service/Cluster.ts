import { fork, isMaster, on, Worker, workers } from 'cluster';
import { cpus } from 'os';
import { CLUSTER } from '../configure';
import { DEBUG } from '../modules/logger';
import { ACTION } from '../Interface/Message';

function MASTER(): void {
  DEBUG({ type: 'MASTER_STARTUP', msg: `Nicest version: 4.2.0` })
  CLUSTER ? cpus().forEach(() => fork()) : fork()

  on('message', (worker: Worker, action: ACTION) => {
    const { type } = action
    switch (type) {
      case 'RE_START':
        //重启
        Object.values(workers).forEach((w: Worker | undefined, i: number) => {
          if (!w) return
          setTimeout(() => {
            w.send({ type: 'CLOSE_SERVER', code: 1 })
          }, 2000 * i)
        })
        break
      case 'SHUT_DOWN':
        //关机
        Object.values(workers).forEach((w: Worker | undefined) => {
          if (!w) return
          w.send({ type: 'CLOSE_SERVER', code: 0 })
        })
        break
      default:
        throw new Error('No MsgType!')
    }
  })

  on('exit', (worker: Worker, code: number) => {
    switch (code) {
      case 1:
        //重启
        DEBUG({ type: 'WORKET_EXIT', pid: worker.process.pid, msg: 'restart' })
        return fork()
      case 0:
        //关机
        return DEBUG({ type: 'WORKET_EXIT', pid: worker.process.pid, msg: 'shutdown' })
      default:
        throw new Error('process exception')
    }
  })
}

export async function RUN_CLUSTER(): Promise<void> {
  if (isMaster) {
    MASTER()
  } else {
    const { RUN_WORKER } = await import('./Worker')
    RUN_WORKER()
  }
}