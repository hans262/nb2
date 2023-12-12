import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { Logger } from '../src/index.js';
import { PATH } from './common/constant.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url))

cluster.setupPrimary({ exec: __dirname + '/index.js' })

Logger.self.stdlog({
  level: 'master_startup', color: 'magenta', logPath: PATH.__log(),
  msg: 'cpus: ' + cpus().length
})

cpus().forEach(() => cluster.fork())

cluster.on('message', (_, m) => {
  if (m === 'restart') {
    Object.values(cluster.workers!).forEach((w, id) => {
      setTimeout(() => {
        w?.send('restart')
      }, 2000 * id)
    })
  }
})

//监控子进程退出的信号
cluster.on('exit', (_, code) => {
  if (code === 1) {
    const pid = _.process.pid
    cluster.fork()
    Logger.self.stdlog({
      level: 'worker_restart', color: 'magenta', logPath: PATH.__log(),
      msg: 'pid: ' + pid
    })
  }

  if (code === 0) {
    //关闭进程，只关闭了当前进程
    const pids = Object.values(cluster.workers!).map(w => w?.process.pid)
    Logger.self.stdlog({
      level: 'worker_exit', color: 'magenta', logPath: PATH.__log(),
      msg: 'current pids: ' + pids.toString()
    })
  }
})