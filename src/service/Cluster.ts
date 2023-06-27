// import cluster from 'node:cluster';
// import { cpus } from 'node:os';
// import { CLUSTER, PORT } from '../configure/index.js';
// import { DEBUG } from '../modules/logger.js';
// import { ACTION } from '../interface/Message.js';

// import {
//   checkController, checkAuth, mounted,
//   proxy, favicon, statics
// } from '../../app/middleware/index.js';

// function MASTER() {
//   DEBUG({ type: 'MASTER_STARTUP', msg: `Nicest version: 4.2.0` })
//   CLUSTER ? cpus().forEach(() => cluster.fork()) : cluster.fork()

//   //监控子进程发来的消息
//   cluster.on('message', (_, action: ACTION) => {
//     const { type } = action
//     switch (type) {
//       case 'RE_START':
//         //重启
//         cluster.workers && Object.values(cluster.workers).forEach((w, i) => {
//           if (!w) return
//           setTimeout(() => {
//             //向进程发送一个自杀的信号
//             w.send({ type: 'CLOSE_SERVER', code: 1 })
//           }, 2000 * i)
//         })
//         return
//       case 'SHUT_DOWN':
//         //关机
//         cluster.workers && Object.values(cluster.workers).forEach(w => {
//           if (!w) return
//           w.send({ type: 'CLOSE_SERVER', code: 0 })
//         })
//         return
//     }
//   })

//   //监控是否有进程结束
//   cluster.on('exit', (worker, code) => {
//     switch (code) {
//       case 1:
//         //重启
//         DEBUG({ type: 'WORKET_EXIT', pid: worker.process.pid, msg: 'restart' })
//         return cluster.fork()
//       case 0:
//         //关机
//         return DEBUG({ type: 'WORKET_EXIT', pid: worker.process.pid, msg: 'shutdown' })
//     }
//   })
// }

// export async function RUN_CLUSTER() {
//   if (cluster.isPrimary) {
//     MASTER()
//   } else {
//     const { Nicest } = await import('./Nicest.js')
//     const nicest = new Nicest()

//     nicest.use(
//       mounted,
//       favicon,
//       proxy,
//       checkAuth,
//       checkController,
//       statics
//     )

//     nicest.run(PORT)
//   }
// }