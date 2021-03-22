import { fork, isMaster, on, Worker, workers } from 'cluster';
import { cpus } from 'os';
import { CLUSTER, PORT } from '../configure';
import { DEBUG } from '../modules/logger';
import { ACTION } from '../Interface/Message';

function MASTER() {
  DEBUG({ type: 'MASTER_STARTUP', msg: `Nicest version: 4.2.0` })
  CLUSTER ? cpus().forEach(() => fork()) : fork()

  on('message', (_, action: ACTION) => {
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
        return
      case 'SHUT_DOWN':
        //关机
        Object.values(workers).forEach((w: Worker | undefined) => {
          if (!w) return
          w.send({ type: 'CLOSE_SERVER', code: 0 })
        })
        return
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
    }
  })
}

export async function RUN_CLUSTER() {
  if (isMaster) {
    MASTER()
  } else {
    const { Nicest } = await import('./Worker')
    const nicest = new Nicest()
    nicest.listen(PORT)
  }
}