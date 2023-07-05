import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { stdlog } from '../src/common/logger.js';

if (cluster.isPrimary) {
  cpus().forEach(() => cluster.fork())
  stdlog({ type: 'master_startup', color: 'underline' })

  //监控子进程退出的信号
  cluster.on('exit', (worker, code) => {
    if (code === 1) {
      //重启，只重启的当前进程
      cluster.fork()
      const pids = Object.values(cluster.workers!).map(w => w?.process.pid)

      stdlog({
        type: 'worker_restart',
        msg: 'current pids: ' + pids.toString(),
        color: 'underline'
      })
    }

    if (code === 0) {
      //关闭进程，只关闭了当前进程
      const pids = Object.values(cluster.workers!).map(w => w?.process.pid)
      stdlog({
        type: 'worker_exit',
        msg: 'current pids: ' + pids.toString(),
        color: 'underline'
      })
    }
  })

} else {
  const { Nicest } = await import('../src/service/Nicest.js')
  const { Controllers } = await import('./controller/index.js')
  const { mounted } = await import('./middleware/mounted.js')

  const app = new Nicest({
    staticRoot: '/Users/macbookair/Desktop/develop/nicest'
  })

  app.useControllers(Controllers)
  app.use(mounted)
  app.run()
}
