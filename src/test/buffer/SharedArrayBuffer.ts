/**
 * SharedArrayBuffer()
 * 分配一段内存缓冲区，类似ArrayBuffer
 * 需通过数据视图读写
 * 可在多线程中共享此内存地址
 * 
 */

//创建64个字节的区域
let sab = new SharedArrayBuffer(64)
//创建8位无符号整型视图，每个位置占一个字节
let u8v = new Uint8Array(sab)
u8v.fill(255)
console.log(u8v)
debugger


/**
 * 多线程共享内存
 */
// 主线程
// 新建 1KB 共享内存
// const sharedBuffer = new SharedArrayBuffer(1024)
// 主线程将共享内存的地址发送出去
// w.postMessage(sharedBuffer)
// 子线程
// 通过onMessage拿到共享数据，在共享内存上建立视图，供写入数据
// const sharedArray = new Int32Array(sharedBuffer)


/**
 * Atomics
 * 对SharedArrayBuffer进行原子操作
 * 
 * 多线程共享内存，最大的问题就是如何防止两个线程同时修改某个地址
 * 当一个线程修改共享内存以后，必须有一个机制让其他线程同步。
 * 保证所有共享内存的操作都是“原子性”的，可以在所有线程内同步
 * 
 */