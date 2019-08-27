import { Worker } from 'worker_threads'

const task = (num: number): Promise<number> => new Promise<number>((
  resolve: (data: number) => void,
  reject: (reason: Error) => void
) => {
  const worker: Worker = new Worker(__dirname + '/compute_fibonacci.js', {
    workerData: num
  })
  worker.on('message', resolve)
  worker.on('error', reject)
  worker.on('exit', (code: number) => {
    if (code !== 0)
      reject(new Error(`Worker stopped with exit code ${code}`))
  })
})

/**
 * 多线程测试 ->
 * 斐波那契数列 40 41 位
 */
export function test(): void {
  const nums: number[] = [40, 41]
  const start: number = Date.now()
  Promise.all(nums.map(n => task(n))).then(ret => {
    const timer: number = Date.now() - start
    console.log(`fib ${nums} = ${ret}`)
    console.log('timer = ' + timer + 'ms')
  })
}