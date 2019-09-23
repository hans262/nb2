import { Worker, isMainThread, parentPort, threadId } from 'worker_threads'
/**
 * 多线程共享内存的例子
 */

if (isMainThread) {
  const sab = new SharedArrayBuffer(20)
  const iv = new Int32Array(sab)
  //总共20张票
  iv[0] = 20
  for (let i = 0; i < 2; i++) {
    let worker = new Worker(__filename)
    worker.postMessage(sab)
    worker.on('message', data => {
      console.log(data)
    })
  }
} else {
  parentPort!.once('message', (msg) => {
    const iv = new Int32Array(msg)
    //卖票
    let cur;
    while ((cur = Atomics.load(iv, 0)) > 0 && cur <= 20) {
      console.log(`threadId ${threadId} = ${iv[0]}`)
      Atomics.store(iv, 0, cur - 1)
    }
    //结束
    parentPort!.postMessage(`threadId ${threadId}, done`)
  })
}