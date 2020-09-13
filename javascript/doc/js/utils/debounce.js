/**
 * 防抖动，多次触发，只执行一次，利用延迟原理
 * @param {Function} method
 * @param {Number} delay
 */
function debounce(method, delay) {
  let timer = null
  return function () {
    let self = this, args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      method.apply(self, args)
    }, delay)
  }
}