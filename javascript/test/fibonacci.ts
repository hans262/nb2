/**
 * 斐波那契数列 递归测试
 */
const fibonacci = (num: number): number =>
  num <= 2 ? 1 : fibonacci(num - 1) + fibonacci(num - 2)

export function test(num: number): void {
  console.time('fib')
  const ret = fibonacci(num)
  console.timeEnd('fib')
}

test(45)