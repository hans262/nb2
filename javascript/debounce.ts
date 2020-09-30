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
	function debounce(func: (...arg: any[]) => void, wait: number, immediate?: boolean) {
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

	const myEmitter = new EventEmitter()
	myEmitter.on('send', debounce(function (this: NodeJS.EventEmitter, evt) {
		console.log(evt)
	}, 1000, false))

	console.log('start')
	//连续触发三次事件
	myEmitter.emit('send', 1)
	myEmitter.emit('send', 2)
	myEmitter.emit('send', 3)

	setTimeout(() => {
		myEmitter.emit('send', '1 of 2 minutes after')
		myEmitter.emit('send', '2 of 2 minutes after')
		myEmitter.emit('send', '3 of 2 minutes after')
	}, 2000)
}
