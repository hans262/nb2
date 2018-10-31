let O=function(ele){
	if(ele.charAt(0)==='.'){
		if(ele.indexOf(' ')===-1) return document.querySelector(ele)
		else return document.querySelectorAll(ele)
	}else if(ele.charAt(0)==='#'){
		if(ele.indexOf(' ')===-1) return document.getElementById(ele.split('#')[1])
		else return document.querySelectorAll(ele)
	}else return document.getElementsByTagName(ele)
}

let Oall=function(ele){
	return document.querySelectorAll(ele)
}

let getStyle=function(ele,attr){
  return ele.currentStyle ? ele.currentStyle[attr] : window.getComputedStyle(ele, null)[attr]
}

let ajax=function(url,opt){
	let o = opt ? opt : {}
	o.type=(o.type)?o.type:'get'
	o.data=(o.data)?o.data:null
	o.async=(o.async)?false:true
	o.success=(o.success)?o.success:function(){}
	o.failed=(o.failed)?o.failed:function(){}
	o.header=(o.header)?o.header:null
	let xhr=(window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
	
	if(o.data && Object.prototype.toString.call(o.data)==='[object Object]'){
		let arr=[]
		for(let key in o.data) arr.push(key+'='+o.data[key])
		o.data=arr.join('&')
	}
	if(o.data && o.type==='get'){
		url+='?'
		url+=o.data
		data=null
	}
	xhr.open(o.type,url,o.async)
	if(o.header && (typeof o.header === 'object')){
		for(let key in o.header) xhr.setRequestHeader(key,o.header[key])
	}
	if(o.data && o.type==='post'){
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
	}
	xhr.send(o.data)
	xhr.onreadystatechange=function(){
		if(xhr.readyState===4){
			if(xhr.status===200 || xhr.status===206){
				o.success(xhr.responseText)
			}else{
				o.failed({status:this.status,statusText:this.statusText})
			}
		}
	}
}
/*
	ajax调用方法
	ajax('/user',{
		type:'post',
		async:false,
		data:{name:'zhangs',age:28,sex:'male'},//可json
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
/*
	jsonp调用方法
	jsonp('http://localhost:3000/jsonp',{
		data:{name:'zhangs',age:28,},
		success:function(data){
      console.log(data)
    }
	})
*/

let Router=function(){
	this.routes={}
	this.url=''
}
Router.prototype.route=function(path,callback){
	this.routes[path]=callback || function (){} //存入回调
}
Router.prototype.refresh=function(){
	this.url=location.hash || '/' //获取url，并存入
	this.routes[this.url]() //执行回调
}
Router.prototype.init=function(){
	window.addEventListener('load',this.refresh.bind(this))
	window.addEventListener('hashchange',this.refresh.bind(this))
}
/*
	Router调用方法
	window.Router=new Router()
	Router.route('/',function(){
	    console.log('index')
	})
	window.Router.init()
*/

let setCookie=function(o){
	o.time=(o.time) ? o.time : 30
	o.path=(o.path) ? o.path : '/'
	let d=new Date()
	d.setTime(d.getTime()+(o.time*24*60*60*1000))
	let expires='expires='+d.toGMTString()
	let path='path='+o.path
	document.cookie=o.key+'='+o.value+'; '+expires+'; '+path
}
/*
	setCookie调用方法
	setCookie({
		key:'myCookie7',
		value:'test7s5',
		time:1,
	})
*/

let removeCookie=function(key,path){
	document.cookie=key+'= ; path='+path+'; expires='+new Date().toGMTString()
}
/*
	removeCoookie调用方法
	removeCookie(key,path)
	删除注意path路径是否一致
*/

let getCookie=function(key){
	let o={}
	let arr=document.cookie.split('; ')
	for(let i=0;i<arr.length;i++){
		let temp=arr[i].split('=')
		o[temp[0]]=temp[1]
	}
	if(key==undefined) return o
	else return o[key]
}
/*
	getCookie调用方法
	getCookie(key)
	传参返回当前value
	不传返回对象
*/

let arrSort=function(arr){
  let k=arr.length
  while(k>0){
    for (let i=0;i<arr.length-1;i++){
    	//如果相邻第一个数大于第二个数，就替换位置
      if (arr[i]>arr[i+1]){
        let temp=arr[i]
        arr[i]=arr[i+1]
        arr[i+1]=temp
      }
    }
    k--
  }
  return arr
}
/*
	冒泡排序调用方法
	let arr=[3, 2, 4, 9, 1, 5, 7, 6, 8]
	let arrSorted=arrSort(arr)
	console.log(arrSorted)
*/

let loadImage=function(path){
	return new Promise(function(resolve,reject){
		let image=new Image()
		image.onload=resolve
		image.onerror=reject
		image.src=path
	})
}
/*
	Promise异步加载图片,并抛出错误
	loadImage('510.png').then((resolve,reject)=>{
		console.log(resolve)
	})
*/

let animate=function(ele,attrs,time,callback){
  //储存初始属性
  let starts={}
  for(let key in attrs){
    if(key==='opacity'){
      starts[key]=parseFloat(getStyle(ele,key))
    }else{
      //ie浏览器获取到的默认定位值为auto
      if(getStyle(ele,key)==='auto'){
        starts[key]=0
      }else{
        starts[key]=parseInt(getStyle(ele,key))
      }
    }
  }
  //将时间划分成100份
  let speed=time/100
  let end=0
  ele.timer=setInterval(function(){
    end+=9
    for(key in attrs){
      if(key==='opacity'){
        //透明度单独处理
        let deg=(attrs[key]-starts[key])*100* Math.sin((end/10)*(Math.PI / 180))
        ele.style.opacity=(starts[key]*100+deg)/100
      }else{
        //求出增量,正弦值0-90度对应0-1之间的增量
        let deg=(attrs[key]-starts[key]) * Math.sin((end/10)*(Math.PI / 180))
        ele.style[key]=(starts[key]+deg)+'px'
      }
    }
    if(end===900){
      clearInterval(ele.timer)
      if(callback) callback()
    }
  },speed)
}
/*
	调用方法
	animate(ele,{
		'left':'120',
		'top':'100',
		'opacity':'.3',
  },2000,function(){
    console.log('动画结束')
    console.log(.3)
  })
*/

let throttle=function(fun,delay,time){
	let timeout,
		startTime=new Date()
	return function(){
		let nowTime=new Date()
		clearTimeout(timeout)
		if(nowTime-startTime>=time){
			fun.apply(this,arguments)
			startTime=nowTime
		}else{
			timeout=setTimeout(function(){
				fun.apply(this,arguments)
			},delay)
		}
	}
}
/*
	函数节流
	delay延迟时间
	time多少时间内只执行一次
*/

let lazyLoad=function(defaultSrc){
	this.img=Oall('img')
	this.len=this.img.length
	this.start=0
	this.defaultSrc=defaultSrc
}
lazyLoad.prototype.master=function(){
	let scrollTop=document.documentElement.scrollTop || document.body.scrollTop
	let height=window.innerHeight
	for(let i=this.start;i<this.len;i++){
		if(this.img[i].offsetTop<height+scrollTop){
			if(this.img[i].getAttribute('src')===this.defaultSrc){
				this.img[i].src=this.img[i].getAttribute('data-src')
			}
			this.start=i+1
		}
	}
}
lazyLoad.prototype.imple=function(){
	window.addEventListener('scroll',throttle(this.master.bind(this),200,500),false)
}
lazyLoad.prototype.init=function(){
	this.master()
}
/*
	调用方法
	let LazyLoad=new lazyLoad('511.png')
	LazyLoad.imple()
	LazyLoad.init()//初始化，执行一次
*/



/*
	=========浏览器兼容性处理=========

	浏览器宽高（不包括滚动条）
	console.log(window.innerWidth)
	console.log(window.innerHeight)

	获取浏览器顶部滚动距离
	let scrollTop=document.documentElement.scrollTop || document.body.scrollTop

	获取子节点
	ele.children

	获取父节点
	ele.parentNode
	
	前一个兄弟
	ele.previousElementSibling

	后一个兄弟
	ele.nextElementSibling
	
	绑定this继承到下一个函数
	Intro.call(this,name,age)
	
	取消默认事件
	e.preventDefault()
	
	设置属性、获取属性
	el.setAttribute('val')
	el.getAttribute('key','value')

*/