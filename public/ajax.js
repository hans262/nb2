/**
 * 原生ajax请求
 * @param {string} url 请求路径
 * @param {object} opt 配置项
 * 
 * post数据必须使用json
 * 支持中断请求
 * 支持fromData
 * 支持设置超时
 */

function ajax(url, opt={}) {
  let { type='get', headers, params=null, timeout=0, getXhr }=opt
	return new Promise((resolve,reject)=>{
		const xhr=new XMLHttpRequest()
		//处理get请求
		if(type==='get' && params && params.toString()==='[object Object]'){
			let arr=[]
			for(let key in opt.params) arr.push(key+'='+opt.params[key])
			params=arr.join('&')
			url+='?'+params
			params=null
		}
		xhr.open(type,url)
		//设置请求头
		if(headers && headers.toString()==='[object Object]'){
			for(let key in headers) xhr.setRequestHeader(key,headers[key])
		}
		//设置超时
		xhr.timeout = timeout
		//监听上传进度
		xhr.upload.onprogress=function(ev){}
		//处理post请求
		if(type==='post' && params){
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    }
		xhr.send(params)
		//监听响应
		xhr.onreadystatechange=function(){
			if(xhr.readyState===4){
				switch(xhr.status){
					case 0:
						return reject({url:xhr.responseURL,status:xhr.status,statusText:'请求超时'})
					case 200:
					case 206:
						return resolve(xhr.responseText)
					default:
						return reject({url:xhr.responseURL,status:xhr.status,statusText:xhr.statusText})
				}
			}
		}
		//把xhr抛出去，以便可以取消请求
		if(getXhr){
			getXhr(xhr)
		}
	})
}

/*
	jsonp跨域请求
	jsonp('http://localhost:3000/jsonp',{
		data:{name:'zhangs',age:28,},
		success:function(data){
      console.log(data)
    }
	})
*/
let jsonp=function(url,opt){
	if(!url) return
	let o = opt ? opt : {}
	let callback='callback'+Date.now()
	o.success=(o.success) ? o.success : function(){}
	o.data=(o.data) ? o.data : null
	window[callback]=function(data){
		o.success(data)
	}
	let s=document.createElement('script')
	s.src+=url+'?'+'callback='+callback
	if(o.data && typeof o.data==='object'){
		let arr=[]
		for(let key in o.data) arr.push(key+'='+o.data[key])
		o.data=arr.join('&')
		s.src+='&'+o.data
	}
	let body=document.getElementsByTagName('script')[0].parentNode
	body.appendChild(s)
	body.removeChild(s)
}
