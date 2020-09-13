/**
 * 节流函数，多次触发，只执行一次，忽略后续触发
 * @param {Function} action 执行动作
 * @param {number} delay 延迟
 */
export function throttle(action, delay){
	let last = 0
	return function() {
		let curr = Date.now()
		if (curr - last > delay) {
			action.apply(this, arguments)
			last = curr
		}
	}
}