/**
 * Atomics
 * 对SharedArrayBuffer进行原子操作
 * 
 * 多线程共享内存，最大的问题就是如何防止两个线程同时修改某个地址
 * 当一个线程修改共享内存以后，必须有一个机制让其他线程同步。
 * 保证所有共享内存的操作都是“原子性”的，可以在所有线程内同步
 * 
 */

namespace TestAtomics {
  let sab2 = new SharedArrayBuffer(20)
  let vi = new Uint8Array(sab2)
  // vi.fill(255)

  console.log(Atomics)
  //设置值
  Atomics.store(vi, 0, 255)
  console.log(vi)
  //获取值
  console.log(Atomics.load(vi, 0))
  debugger

  //线程等待和线程通知
  // Atomics.wait(vi, 0, 0);
  // Atomics.notify(vi, 0, 1);
}
