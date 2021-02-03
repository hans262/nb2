import { Worker, isMainThread, parentPort, threadId } from 'worker_threads'
/**
 * 多线程共享内存的例子
 */
if (isMainThread) {
  const sab = new SharedArrayBuffer(20)
  const iv = new Uint8Array(sab)
  for (let i = 0; i < 2; i++) {
    let worker = new Worker(__filename)
    worker.postMessage(sab)
    worker.on('message', () => {
      console.log(iv)
    })
  }
} else {
  parentPort!.once('message', (msg) => {
    const iv = new Uint8Array(msg)
    iv[threadId] = threadId
    parentPort!.postMessage('done')
  })
}