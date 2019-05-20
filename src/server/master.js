const cluster = require('cluster')
const cpus = require('os').cpus()
const conf = REQUIRE('config/default')
const { CLUSTER } = conf

function master() {
  const nowTime = new Date().toLocaleString()
  console.info(`[MASTER STARTUP] pid: ${process.pid} date: ${nowTime}`)
  CLUSTER ? cpus.forEach(() => cluster.fork()) : cluster.fork()
  
  cluster.on('message', (worker, action) => {
    switch (action.type) {
      case 'INFO':
        const { pid, msg, msgtype } = action
        const nowTime = new Date().toLocaleString()
        console.info(`[${msgtype}] pid: ${pid} date: ${nowTime} -> ${msg}`)
        break
      case 'RE_START':
        //重启
        Object.values(cluster.workers).forEach((w, i) => {
          setTimeout(() => {
            w.send({ type: 'CLOSE_SERVER', code: 1 })
          }, 2000 * i)
        })
        break
      case 'SHUT_DOWN':
        //关机
        Object.values(cluster.workers).forEach(w => {
          w.send({ type: 'CLOSE_SERVER', code: 0 })
        })
        break
      default:
        throw new Error('No MsgType!')
    }
  })

  cluster.on('exit', (worker, code) => {
    const nowTime = new Date().toLocaleString()
    console.info(`[WORKET EXIT] pid: ${worker.process.pid} date: ${nowTime}`)
    if (code === 1) {
      //重启
      cluster.fork()
    }
  })

}

function run() {
  if (cluster.isMaster) {
    master()
  } else {
    const worker = require('./worker')
    worker()
  }
}

module.exports = run