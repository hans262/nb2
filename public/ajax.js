let O=function(ele){
	if(ele.charAt(0)==='.'){
		if(ele.indexOf(' ')===-1) return document.querySelector(ele)
		else return document.querySelectorAll(ele)
	}else if(ele.charAt(0)==='#'){
		if(ele.indexOf(' ')===-1) return document.getElementById(ele.split('#')[1])
		else return document.querySelectorAll(ele)
	}else return document.getElementsByTagName(ele)
}

class Ajax{
	constructor(){
		// console.info(Object.prototype.toString.call(new Date()))
		// console.info(typeof new Date())
	}
	all(promise){
		return Promise.all(promise)
	}
	parseParams(params){
		if(!params) return null
		if(params.constructor.name!=='Object') return params
		if(Object.keys(params).length===0) return null
		let arr=[]
		for(let key in params) arr.push(key+'='+params[key])
		return arr.join('&')
	}
	response(xhr,resolve,reject){
		xhr.onreadystatechange=function(){
			if(xhr.readyState===4){
				switch(xhr.status){
					case 200 :
					resolve(xhr.responseText)
					break
					case 206 :
					resolve(xhr.responseText)
					break
					default :
					reject({url:xhr.responseURL,status:xhr.status,statusText:xhr.statusText})
				}
			}
		}
	}
	get(url,opt){
		return new Promise((resolve,reject)=>{
			opt=opt ? opt : {}
			let { header=null, params }=opt
			params=this.parseParams(params)
			const xhr=new XMLHttpRequest()
			if(params && typeof params === 'string'){
				url+='?'+params
			}
			xhr.open('GET', url)
			if(header && (typeof header === 'object')){
				for(let key in header) xhr.setRequestHeader(key,opt.header[key])
			}
			xhr.send()
			this.response(xhr,resolve,reject)
		})
	}
	post(url,opt){
		return new Promise((resolve,reject)=>{
			opt=opt ? opt : {}
			let { header=null, params }=opt
			params=this.parseParams(params)
			const xhr=new XMLHttpRequest()

			xhr.open('POST', url)
			if(header && (typeof header === 'object')){
				for(let key in header) xhr.setRequestHeader(key,opt.header[key])
			}
			if(params){
				xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
			}
			xhr.send(params)
			this.response(xhr,resolve,reject)
		})
	}
}

let ajax=new Ajax()