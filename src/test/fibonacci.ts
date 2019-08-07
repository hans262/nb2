/**
 * 斐波那契数列 递归测试
 */
function fibonacci(num: number): number {
  if (num <= 2) {
    return 1
  } else {
    return fibonacci(num - 1) + fibonacci(num - 2)
  }
}
function fibonacci2(num: number): number {
  const array: number[] = [];
  for (let i = 0; i < num; i++) {
    if (i > 1) {
      array[i] = array[i - 1] + array[i - 2]
    } else {
      array[i] = 1
    }
  }
  return array[num - 1]
}

export function test(num: number): void {
  const start: number = Date.now()
  const ret = fibonacci(num)
  const timer: number = Date.now() - start
  console.log(`fib ${num} = ${ret}`)
  console.log('timer = ' + timer + 'ms')
}