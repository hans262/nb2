import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { stdlog } from '../src/common/logger.js';

//日志存放目录
const systemLogPath = '/Users/macbookair/Desktop/develop/nicest/logs'

if (cluster.isPrimary) {
  stdlog({
    type: 'master_startup', color: 'magenta', logPath: systemLogPath,
    msg: 'cpus = ' + cpus().length
  })
  cpus().forEach(() => cluster.fork())
  
  //监控子进程退出的信号
  cluster.on('exit', (_, code) => {
    if (code === 1) {
      //重启，只重启的当前进程
      cluster.fork()
      const pids = Object.values(cluster.workers!).map(w => w?.process.pid)

      stdlog({
        type: 'worker_restart', color: 'magenta', logPath: systemLogPath,
        msg: 'current pids: ' + pids.toString()
      })
    }

    if (code === 0) {
      //关闭进程，只关闭了当前进程
      const pids = Object.values(cluster.workers!).map(w => w?.process.pid)
      stdlog({
        type: 'worker_exit', color: 'magenta', logPath: systemLogPath,
        msg: 'current pids: ' + pids.toString()
      })
    }
  })

} else {
  const { WebServer } = await import('../src/webserver.js')
  const { Controllers } = await import('./controller/index.js')

  const app = new WebServer({
    staticRoot: '/Users/macbookair/Desktop/develop/nicest',
    systemLogPath
  })

  app.useControllers(Controllers)
  app.run()
}
