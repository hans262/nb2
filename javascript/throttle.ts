/**
 * 连续触发事件，但是在 n 秒中只执行一次函数。
 * 截流
 * 每隔相同事件，最多触发一次
 */

import * as EventEmitter from 'events'

namespace Test {
  function throttle(func: (...args: any[]) => void, wait: number) {
    let last = 0
    return function (this: any) {
      const args = Object.values(arguments)
      let now = Date.now()
      if (now - last > wait) {
        func.apply(this, args)
        last = now
      }
    }
  }
  const myEmitter = new EventEmitter()
  myEmitter.on('send', throttle(function(evt){
    console.log(evt)
  },1000))
  console.log('start')
  myEmitter.emit('send', 1)
  myEmitter.emit('send', 2)
  myEmitter.emit('send', 3)

}