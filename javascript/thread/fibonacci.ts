import { Worker } from 'worker_threads'

const task = (num: number): Promise<number> => new Promise<number>((
  resolve: (data: number) => void,
  reject: (reason: Error) => void
) => {
  const worker: Worker = new Worker(__dirname + '/compute_fibonacci.js', {
    workerData: num
  })
  worker.once('message', resolve)
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
export function test(nums: number[] = [40, 41]): void {
  console.time('timer')
  Promise.all(nums.map(n => task(n))).then(ret => {
    console.log(`fib ${nums} = ${ret}`)
    console.timeEnd('timer')
  })
}

/**
 * 斐波那契数列 递归测试
 */
const fibonacci = (num: number): number =>
  num <= 2 ? 1 : fibonacci(num - 1) + fibonacci(num - 2)

export function test2(num: number): void {
  console.time('fib')
  const ret = fibonacci(num)
  console.timeEnd('fib')
}