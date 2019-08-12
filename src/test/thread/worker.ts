import { parentPort, workerData } from 'worker_threads'

const fibonacci = (num: number): number => {
  if (num <= 2) {
    return 1
  } else {
    return fibonacci(num - 1) + fibonacci(num - 2)
  }
}

const number = workerData
const fib = fibonacci(number)
if (parentPort) {
  parentPort.postMessage(fib)
}