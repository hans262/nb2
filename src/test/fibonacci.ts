/**
 * 斐波那契数列 递归测试
 */
const fibonacci = (num: number): number => {
  if (num <= 2) {
    return 1
  } else {
    return fibonacci(num - 1) + fibonacci(num - 2)
  }
}

export function test(num: number): void {
  const start: number = Date.now()
  const ret = fibonacci(num)
  const timer: number = Date.now() - start
  console.log(`fib ${num} = ${ret}`)
  console.log('timer = ' + timer + 'ms')
}