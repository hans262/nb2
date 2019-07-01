function ajax(url, opt = {}) {
	let { type = 'get', headers, params = null, timeout = 0, getXhr, responseType = '' } = opt
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		//处理get请求
		if (type === 'get' && params && params.constructor.name === 'Object') {
			let arr = []
			for (let key in opt.params) arr.push(key + '=' + opt.params[key])
			params = arr.join('&')
			url += '?' + params
			params = null
		}
		xhr.open(type, url)
		//设置超时
		xhr.timeout = timeout
		//设置响应枚举
		xhr.responseType = responseType
		//上传进度
		xhr.upload.onprogress = function (ev) {
			console.log('进度：' + (100 * ev.loaded / ev.total).toFixed(2) + '%')
		}

		//处理post请求，目前阶段不需要设置，看兼容情况
		if (type === 'post' && params && params instanceof FormData) {
			// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
		}
		//设置请求头
		if (headers && headers.constructor.name === 'Object') {
			for (let key in headers) xhr.setRequestHeader(key, headers[key])
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