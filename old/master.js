import { isMaster, fork, on, workers } from 'cluster'
import { cpus } from 'os'
import { CLUSTER } from '../conf'

function master() {
  const nowTime = new Date().toLocaleString()
  console.info(`[MASTER STARTUP] pid: ${process.pid} date: ${nowTime}`)
  CLUSTER ? cpus().forEach(() => fork()) : fork()

  on('message', (worker, action) => {
    switch (action.type) {
      case 'INFO':
        const { pid, msg, msgtype } = action
        const nowTime = new Date().toLocaleString()
        console.info(`[${msgtype}] pid: ${pid} date: ${nowTime} -> ${msg}`)
        break
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
    const nowTime = new Date().toLocaleString()
    console.info(`[WORKET EXIT] pid: ${worker.process.pid} date: ${nowTime}`)
    if (code === 1) {
      //重启
      fork()
    }
  })

}

export async function RUN(): Promise<void> {
  if (isMaster) {
    master()
  } else {
    const { worker } = await import('./worker')
    worker()
  }
}