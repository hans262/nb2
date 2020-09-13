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