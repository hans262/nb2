/**
 * debounce 防抖函数
 * 在固定间隔时间内，触发的多次事件，
 * 只执行第一次或最后一次，忽略中间事件。
 * 
 */
import * as  EventEmitter from 'events'

namespace Test {
  /**
   * 防抖函数
   * @param func 执行函数
   * @param wait 延迟时间
   * @param immediate 是否立即执行
   */
  function debounce(func: (...arg: any) => void, wait: number, immediate?: boolean) {
    let timer: NodeJS.Timeout | null = null
    return function (this: any) {
      let args = Object.values(arguments)
      if (timer) clearTimeout(timer)
      if (immediate) {
        let callNow = !timer
        timer = setTimeout(() => {
          timer = null
        }, wait)
        if (callNow) func.apply(this, args)
      } else {
        timer = setTimeout(() => {
          func.apply(this, args)
        }, wait)
      }
    }
  }

  const myEmitter = new EventEmitter();
  myEmitter.on('event', debounce(function (this: NodeJS.EventEmitter, e) {
    console.log(e)
  }, 1000, true))

  console.log('start')
  myEmitter.emit('event', 1)
  myEmitter.emit('event', 2)
  myEmitter.emit('event', 3)

}
