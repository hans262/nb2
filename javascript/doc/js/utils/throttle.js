/**
 * 连续触发事件，但是在 n 秒中只执行一次函数。
 * 
 */
function throttle(func, wait) {
	let last = 0
	return function () {
		let now = Date.now()
		if (now - last > wait) {
			func.apply(this, arguments)
			last = now
		}
	}
}