import { Worker, isMainThread, parentPort } from 'worker_threads'

// 主线程
if (isMainThread) {
  const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 5)
  const ia = new Int32Array(sab);

  for (let i = 0; i < ia.length; i++) {
    ia[i] = i
  }
  for (let i = 0; i < 2; i++) {
    let w = new Worker(__filename)
    w.postMessage(sab)
    w.on('message', () => {
      console.log(ia)
    })
  }
} else {
  parentPort!.once('message', (msg) => {
    const ia = new Int32Array(msg, 0, 1);
    ia[0] = ia[0] + 1;
    parentPort!.postMessage('done');
  });
}

// 输出结果
// Int32Array [ 1, 1, 2, 3, 4 ]
// Int32Array [ 2, 1, 2, 3, 4 ]