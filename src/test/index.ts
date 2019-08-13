/**
 * 测试多线程写文件
 * 写入200行，分四个线程去写
 */

import { Worker } from 'worker_threads'
import { createWriteStream } from 'fs';
import { join } from 'path';
import { PUBLIC_PATH } from '../common/path';

//不使用多线程
function test1() {
  const num = 800000
  const writeStream = createWriteStream(join(PUBLIC_PATH, 'text.txt'), {
    flags: 'a'
  })
  const start: number = Date.now()
  for (let i = 0; i < num; i++) {
    writeStream.write('hello world ' + i + '\r\n')
  }
  writeStream.close()
  writeStream.on('close', () => {
    const timer: number = Date.now() - start
    console.log('timer: ' + timer)
  })
}
// test1()

//多线程写入
function test2() {
  const start: number = Date.now()
  for (let i = 0; i < 4; i++) {
    const worker: Worker = new Worker(__dirname + '/worker.js')
    worker.on('error', err => {
      console.log(err)
    })
  }
  process.on('exit', code => {
    const timer: number = Date.now() - start
    console.log('timer: ' + timer)
  })
}
test2()