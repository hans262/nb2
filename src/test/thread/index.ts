import { Worker } from 'worker_threads'

const task = (num: number): Promise<number> => {
  return new Promise((resolve) => {
    const worker = new Worker(__dirname + '/worker.js', {
      workerData: num
    })
    worker.on('message', data => {
      resolve(data)
    })
  })
}

/**
 * 多线程测试 ->
 * 斐波那契数列 40 41 位
 */
export function test() {
  const nums: number[] = [40, 41]
  const start = Date.now()
  Promise.all(nums.map(n => task(n))).then(ret => {
    const timer: number = Date.now() - start
    console.log(`fib ${nums} = ${ret}`)
    console.log('timer = ' + timer + 'ms')
  })
}