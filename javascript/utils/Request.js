/**
 * 原生ajax
 * @param {string} url 路径
 * @param {object} opt 配置项
 * post数据必须使用json
 * 支持中断请求
 * 支持fromData
 * 支持设置超时
 */

export function ajax(url, opt = {}) {
	let { type = 'get', headers, params = null, timeout = 0, getXhr, responseType = '' } = opt
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		//处理get请求
		if (type === 'get' && params && params.toString() === '[object Object]') {
			let arr = []
			for (let key in opt.params) arr.push(key + '=' + opt.params[key])
			params = arr.join('&')
			url += '?' + params
			params = null
		}
		xhr.open(type, url)
		//设置请求头
		if (headers && headers.toString() === '[object Object]') {
			for (let key in headers) xhr.setRequestHeader(key, headers[key])
		}
		//设置超时
		xhr.timeout = timeout
		//设置响应枚举
		xhr.responseType = responseType
		//监听上传进度
		xhr.upload.onprogress = function (ev) { }
		//处理post请求
		if (type === 'post' && params) {
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
		}
		xhr.send(params)
		//监听响应
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				const { responseURL, status, statusText, response } = xhr
				switch (status) {
					case 0:
						return reject({ url: responseURL, status, statusText: '请求超时' })
					case 200:
					case 206:
						return resolve(response)
					default:
						return reject({ url: responseURL, status, statusText })
				}
			}
		}
		//把xhr抛出去，以便可以取消请求
		if (getXhr) {
			getXhr(xhr)
		}
	})
}

/**
 * jsonp跨域
 * @param {string} url 路径
 * @param {object} opt 配置项
 * 支持超时
 * promise对象
 */
export function jsonp(url, opt = {}) {
	if (typeof url !== 'string') {
		throw new Error('Lack of URL parameters')
	}
	return new Promise((resolve, reject) => {
		let { params = null, timeout = 5000 } = opt
		const callback = 'JSONP_CALLBACK_' + Date.now()
		const s = document.createElement('script')
		const body = document.getElementsByTagName('body')[0]
		window[callback] = function (data) {
			resolve(data)
			body.removeChild(s)
			delete window[callback]
			clearTimeout(timerId)
		}
		s.src += url + '?' + 'callback=' + callback
		s.async = true
		if (params && params.constructor.name === 'Object') {
			let arr = []
			for (let key in params) arr.push(key + '=' + params[key])
			params = arr.join('&')
			s.src += '&' + params
		}
		body.appendChild(s)
		s.onerror = function (err) {
			reject(err)
			body.removeChild(s)
			delete window[callback]
			clearTimeout(timerId)
		}
		const timerId = setTimeout(() => {
			resolve(`Request Timeout, By ${timeout / 1000}s`)
			body.removeChild(s)
			delete window[callback]
			window[callback] = function () {
				delete window[callback]
			}
		}, timeout)
	})
}